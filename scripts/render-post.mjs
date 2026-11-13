#!/usr/bin/env node
// Render one computational post with Quarto (R via rv, Python via the uv venv).
//
//   pnpm render <slug>                 # content/writing/<slug>/<slug>.qmd (or .Rmd)
//   pnpm render path/to/post.qmd       # a file path (the VS Code task passes the open file)
//   pnpm watch <slug>                  # = render --watch: re-render on every save, until Ctrl+C.
//                                      #   With `pnpm dev` running, the page reloads by itself.
//
// Then commit <slug>.md, <slug>.markdown_strict_files/ and _freeze/: Vercel never runs R or Python.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2).filter((a) => a !== '--');
const watch = args.includes('--watch');
const arg = args.find((a) => !a.startsWith('--'));

if (!arg) {
  console.error('Usage: pnpm render <slug> | <file.qmd>    pnpm watch <slug> | <file.qmd>');
  process.exit(1);
}

let file;
if (/\.(qmd|Rmd)$/i.test(arg)) {
  file = path.resolve(arg);
} else {
  const dir = path.join(ROOT, 'content', 'writing', arg);
  file = ['.qmd', '.Rmd'].map((ext) => path.join(dir, arg + ext)).find((f) => fs.existsSync(f));
}

if (!file || !fs.existsSync(file)) {
  console.error(`No .qmd/.Rmd found for "${arg}".`);
  process.exit(1);
}

const rel = path.relative(ROOT, file);
const slug = path.basename(path.dirname(file));
const quarto = watch
  ? // Renders once, then again on every save; no Quarto server, Astro's dev server shows it.
    ['preview', rel, '--no-serve', '--no-browser']
  : ['render', rel];

console.log(
  watch
    ? `Watching ${rel}: saves re-render it. Preview: http://localhost:4321/writing/${slug}/ (Ctrl+C to stop)`
    : `Rendering ${rel} …`,
);
const r = spawnSync('uv', ['run', 'quarto', ...quarto], { cwd: ROOT, stdio: 'inherit' });
process.exit(r.status ?? 1);
