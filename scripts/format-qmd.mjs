#!/usr/bin/env node
// Format the code chunks in .qmd/.Rmd files: {r} with Air, {python} with Ruff (project settings:
// air.toml, [tool.ruff] in pyproject.toml). Prose and `#|` chunk options are left as they are.
//
//   pnpm format:qmd                    # every .qmd/.Rmd under content/
//   pnpm format:qmd path/to/post.qmd   # just these files
//   pnpm format:qmd --check            # list files that would change, change nothing (exit 1)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2).filter((a) => a !== '--');
const check = args.includes('--check');
const given = args.filter((a) => !a.startsWith('--'));

const FORMATTERS = {
  r: (code) => run('air', ['format', '--stdin-file-path', 'chunk.R'], code),
  python: (code) =>
    run('uv', ['run', '-q', 'ruff', 'format', '--stdin-filename', 'chunk.py', '-'], code),
};

function run(cmd, cmdArgs, input) {
  const r = spawnSync(cmd, cmdArgs, {
    cwd: ROOT,
    input,
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1' },
  });
  if (r.status !== 0)
    throw new Error((r.stderr || r.stdout || `${cmd} failed`).trim().split('\n')[0]);
  return r.stdout;
}

function* walk(dir) {
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    if (d.name.startsWith('.') || d.name === 'node_modules') continue;
    const abs = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(abs);
    else if (/\.(qmd|Rmd)$/i.test(d.name)) yield abs;
  }
}

// ```{r label, opt=1}   or   ```{python}   …   ``` (same or longer fence)
const OPEN = /^(`{3,})\{\s*(r|python)\b[^}]*\}\s*$/;

function formatFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const out = [];
  const problems = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(OPEN);
    if (!m) {
      out.push(lines[i]);
      continue;
    }
    const [, fence, lang] = m;
    let end = i + 1;
    while (end < lines.length && !new RegExp(`^${fence}\`*\\s*$`).test(lines[end])) end++;
    if (end >= lines.length) {
      out.push(...lines.slice(i)); // unclosed chunk: leave the rest alone
      break;
    }
    const body = lines.slice(i + 1, end);
    const nOpts = body.findIndex((l) => !/^\s*#\|/.test(l));
    const opts = nOpts === -1 ? body : body.slice(0, nOpts);
    const code = nOpts === -1 ? [] : body.slice(nOpts);
    let formatted = code;
    if (code.some((l) => l.trim())) {
      try {
        formatted = FORMATTERS[lang](code.join('\n') + '\n')
          .replace(/\n+$/, '')
          .split('\n');
        // Keep one blank line between the options and the code if there was one.
        if (opts.length && code[0]?.trim() === '' && formatted[0] !== '') formatted.unshift('');
      } catch (e) {
        problems.push(`line ${i + 1} (${lang}): ${e.message}`);
      }
    }
    out.push(lines[i], ...opts, ...formatted, lines[end]);
    i = end;
  }
  return { text: out.join('\n'), problems };
}

const files = given.length
  ? given.map((f) => path.resolve(f))
  : [...walk(path.join(ROOT, 'content'))];

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const { text, problems } = formatFile(file);
  const rel = path.relative(ROOT, file);
  for (const p of problems) console.warn(`${rel}: skipped chunk at ${p}`);
  if (text === before) continue;
  changed++;
  if (check) console.log(`would reformat ${rel}`);
  else {
    fs.writeFileSync(file, text);
    console.log(`formatted ${rel}`);
  }
}
if (!changed) console.log(`${files.length} file(s) already formatted`);
process.exit(check && changed ? 1 : 0);
