// Serve each post folder's non-source files at the post URL:
//   content/writing/<slug>/<rest>  ->  /writing/<slug>/<rest>
//
// Markdown images (![](x.png)) are already optimized by Astro. This covers what Astro can't see:
// raw HTML from Quarto (<img src="slug_files/...">, htmlwidgets <script>/<link> into libs/),
// embedded standalone HTML outputs, downloadable data files, etc. Relative URLs in a post then
// resolve against /writing/<slug>/ exactly as they do next to the file on disk.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_EXT = new Set(['.md', '.mdx', '.qmd', '.Rmd', '.rmd', '.ipynb']);
const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.csv': 'text/csv; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.rds': 'application/octet-stream',
};

const skip = (name) => name.startsWith('.') || name.endsWith('_cache');

/** A post folder is a draft if its .md/.mdx has `draft: true` in the frontmatter. */
function isDraft(folder) {
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) return false;
  return fs
    .readdirSync(folder)
    .filter((f) => ['.md', '.mdx'].includes(path.extname(f)))
    .some((f) => {
      const fm = fs.readFileSync(path.join(folder, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return !!fm && /^draft:\s*true\s*$/m.test(fm[1]);
    });
}

function* walk(dir) {
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip(d.name)) continue;
    const abs = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(abs);
    else if (!SOURCE_EXT.has(path.extname(d.name))) yield abs;
  }
}

/** @param {{ sections?: string[] }} [opts] */
export default function contentAssets({ sections = ['writing'] } = {}) {
  let root;
  return {
    name: 'content-assets',
    hooks: {
      'astro:config:setup': ({ config, updateConfig }) => {
        root = fileURLToPath(config.root);
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'content-assets-dev',
                configureServer(server) {
                  server.middlewares.use((req, res, next) => {
                    const url = decodeURIComponent((req.url ?? '').split('?')[0]);
                    const m = url.match(/^\/([^/]+)\/([^/]+)\/(.+)$/);
                    if (!m || !sections.includes(m[1])) return next();
                    const file = path.join(root, 'content', m[1], m[2], m[3]);
                    const base = path.join(root, 'content', m[1], m[2]);
                    if (!file.startsWith(base + path.sep) || SOURCE_EXT.has(path.extname(file)))
                      return next();
                    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
                    // `pnpm dev:public`: behave like production.
                    if (process.env.DRAFTS === 'hide' && isDraft(base)) return next();
                    res.setHeader(
                      'Content-Type',
                      MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
                    );
                    fs.createReadStream(file).pipe(res);
                  });
                },
              },
            ],
          },
        });
      },
      // Lands in .astro/dev.log, so agents (and you) can tell which mode the running server is in.
      'astro:server:start': ({ logger }) => {
        logger.info(
          process.env.DRAFTS === 'hide'
            ? 'drafts hidden (pnpm dev:public)'
            : 'drafts visible (pnpm dev)',
        );
      },
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        let n = 0;
        const drafts = [];
        for (const section of sections) {
          const src = path.join(root, 'content', section);
          if (!fs.existsSync(src)) continue;
          for (const abs of walk(src)) {
            const rel = path.relative(src, abs);
            const folder = rel.split(path.sep)[0];
            // Drafts have no page in the build, so their assets must not be published either.
            if (rel.includes(path.sep) && isDraft(path.join(src, folder))) {
              if (!drafts.includes(folder)) drafts.push(folder);
              continue;
            }
            const dest = path.join(out, section, rel);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(abs, dest);
            n++;
          }
        }
        logger.info(
          `copied ${n} content asset(s)` +
            (drafts.length ? `; skipped draft folder(s): ${drafts.join(', ')}` : ''),
        );
      },
    },
  };
}
