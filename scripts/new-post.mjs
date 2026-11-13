#!/usr/bin/env node
// Start a new post from templates/:  content/writing/<slug>/<slug>.<ext>, dated today, draft: true.
//
//   pnpm new                                   # asks for title and type
//   pnpm new --type r "My new post"            # md | r | python | mdx
//   pnpm new --type md --slug short "A Long Title"
//   pnpm new --no-open "…"                     # don't open it in VS Code
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = {
  md: { template: 'post.md', ext: '.md', label: 'plain Markdown' },
  r: { template: 'post-r.qmd', ext: '.qmd', label: 'Quarto + R' },
  python: { template: 'post-python.qmd', ext: '.qmd', label: 'Quarto + Python' },
  mdx: { template: 'post.mdx', ext: '.mdx', label: 'MDX (Markdown + components)' },
};

function parseArgs(argv) {
  const opts = { open: true, words: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--type' || a === '-t') opts.type = argv[++i];
    else if (a === '--slug') opts.slug = argv[++i];
    else if (a === '--no-open') opts.open = false;
    else if (a === '--') continue;
    else opts.words.push(a);
  }
  opts.title = opts.words.join(' ').trim();
  return opts;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '') // "Lennart's" -> "lennarts", not "lennart-s"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const today = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const opts = parseArgs(process.argv.slice(2));

if (!opts.title || !opts.type) {
  if (!process.stdin.isTTY) {
    console.error('Usage: pnpm new --type <md|r|python|mdx> "Post title"');
    process.exit(1);
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  while (!opts.title) opts.title = (await rl.question('Title: ')).trim();
  if (!opts.type) {
    const keys = Object.keys(TYPES);
    keys.forEach((k, i) => console.log(`  ${i + 1}) ${k.padEnd(7)} ${TYPES[k].label}`));
    const a = (await rl.question('Type [1]: ')).trim() || '1';
    opts.type = keys[Number(a) - 1] ?? a;
  }
  rl.close();
}

const type = TYPES[opts.type];
if (!type) {
  console.error(`Unknown type "${opts.type}". Use one of: ${Object.keys(TYPES).join(', ')}`);
  process.exit(1);
}

const slug = slugify(opts.slug || opts.title);
if (!slug) {
  console.error('Could not make a slug from that title; pass --slug.');
  process.exit(1);
}

const dir = path.join(ROOT, 'content', 'writing', slug);
const file = path.join(dir, slug + type.ext);
if (fs.existsSync(dir)) {
  console.error(`content/writing/${slug}/ already exists. Pick another title or pass --slug.`);
  process.exit(1);
}

const body = fs
  .readFileSync(path.join(ROOT, 'templates', type.template), 'utf8')
  // JSON string = valid YAML double-quoted scalar, so titles with ":" or quotes are safe.
  .replaceAll('{{title}}', JSON.stringify(opts.title))
  .replaceAll('{{date}}', today())
  .replaceAll('{{slug}}', slug);

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, body);

const rel = path.relative(ROOT, file);
console.log(`Created ${rel} (${type.label}, draft)`);
if (type.ext === '.qmd') console.log(`Render: pnpm render ${slug}`);
console.log(`Preview: http://localhost:4321/writing/${slug}/ (pnpm dev)`);

if (opts.open) {
  const child = spawn('code', [file], { stdio: 'ignore', detached: true });
  child.on('error', () => console.log('(VS Code CLI `code` not found; open the file yourself.)'));
  child.unref();
}
