// Obsidian-flavoured links for content/ (which doubles as an Obsidian vault).
//
//   [[note]]            -> link to the note's page, text = note title-ish name
//   [[note|label]]      -> link with custom label
//   [[note#heading]]    -> link with #anchor
//   ![[image.png]]      -> image (relative path, so Astro optimizes it)
//   ![[image.png|alt]]  -> image with alt text
//
// Notes and attachments are resolved by file name anywhere under content/, like Obsidian's
// "shortest path" link format. Unresolved links render as plain text with a class so they're easy to spot.
import fs from 'node:fs';
import path from 'node:path';
import { findAndReplace } from 'mdast-util-find-and-replace';
import GithubSlugger from 'github-slugger';

const CONTENT_DIR = path.resolve('content');
const NOTE_EXT = new Set(['.md', '.mdx']);
const IGNORE_DIRS = new Set(['.obsidian', '.trash', 'node_modules']);

/** Map a content file to its public URL, or null if it is not a page. */
function urlFor(rel) {
  const parts = rel.split(path.sep);
  const name = path.basename(rel, path.extname(rel));
  if (name.startsWith('_')) return null;
  switch (parts[0]) {
    case 'writing':
      return parts.length === 3 ? `/writing/${parts[1]}/` : null;
    case 'projects':
      return parts.length === 2 ? `/projects/${name.toLowerCase()}/` : null;
    case 'art':
      return parts.length === 2 ? `/art/${name.toLowerCase()}/` : null;
    case 'pages': {
      const id = parts.slice(1).join('/').replace(/\.(md|mdx)$/, '');
      return id === 'home' ? '/' : `/${id}/`;
    }
    default:
      return null;
  }
}

function buildIndex() {
  const notes = new Map(); // lowercased basename -> url
  const files = new Map(); // lowercased file name -> absolute path
  const walk = (dir) => {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      if (IGNORE_DIRS.has(d.name)) continue;
      const abs = path.join(dir, d.name);
      if (d.isDirectory()) walk(abs);
      else {
        const ext = path.extname(d.name);
        if (NOTE_EXT.has(ext)) {
          const url = urlFor(path.relative(CONTENT_DIR, abs));
          if (url) notes.set(path.basename(d.name, ext).toLowerCase(), url);
        } else if (!['.qmd', '.Rmd', '.ipynb'].includes(ext)) {
          files.set(d.name.toLowerCase(), abs);
        }
      }
    }
  };
  if (fs.existsSync(CONTENT_DIR)) walk(CONTENT_DIR);
  return { notes, files };
}

const WIKI = /(!?)\[\[([^\[\]|#]+)(#[^\[\]|]+)?(?:\|([^\[\]]+))?\]\]/g;

export default function remarkObsidian() {
  return (tree, file) => {
    // Rebuilt per file so new notes/attachments are picked up in dev without a restart.
    const { notes, files } = buildIndex();
    const fromDir = file.path ? path.dirname(file.path) : CONTENT_DIR;

    findAndReplace(tree, [
      [
        WIKI,
        (_m, bang, rawTarget, hash, label) => {
          const target = rawTarget.trim();
          if (bang) {
            const base = path.basename(target).toLowerCase();
            const abs = files.get(base);
            if (!abs) return { type: 'text', value: `![[${target}]]` };
            let rel = path.relative(fromDir, abs).split(path.sep).join('/');
            if (!rel.startsWith('.')) rel = `./${rel}`;
            return { type: 'image', url: encodeURI(rel), alt: label?.trim() ?? '', title: null };
          }
          const key = path.basename(target, path.extname(target)).toLowerCase();
          const url = notes.get(key);
          const text = (label ?? target).trim();
          if (!url) {
            return {
              type: 'emphasis',
              data: { hProperties: { className: ['wikilink-missing'] } },
              children: [{ type: 'text', value: text }],
            };
          }
          const anchor = hash ? `#${new GithubSlugger().slug(hash.slice(1))}` : '';
          return {
            type: 'link',
            url: url + anchor,
            data: { hProperties: { className: ['wikilink'] } },
            children: [{ type: 'text', value: text }],
          };
        },
      ],
    ]);
  };
}
