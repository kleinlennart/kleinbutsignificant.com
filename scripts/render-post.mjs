#!/usr/bin/env node
// Render one computational post with Quarto (R via rv, Python via the uv venv).
//
//   pnpm render <slug>                 # content/writing/<slug>/<slug>.qmd (or .Rmd)
//   pnpm render path/to/post.qmd       # a file path (the VS Code task passes the open file)
//
// Then commit <slug>.md, <slug>.markdown_strict_files/ and _freeze/: Vercel never runs R or Python.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv.slice(2).find((a) => a !== '--');

if (!arg) {
  console.error('Usage: pnpm render <slug> | <file.qmd>');
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
console.log(`Rendering ${rel} …`);
const r = spawnSync('uv', ['run', 'quarto', 'render', rel], { cwd: ROOT, stdio: 'inherit' });
process.exit(r.status ?? 1);
