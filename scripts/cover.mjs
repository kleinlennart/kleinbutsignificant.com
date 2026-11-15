// Render a project cover with headless Chrome.
//   pnpm cover <slug>             scripts/covers/<slug>.html → content/projects/images/<slug>.png
//   pnpm cover <file.html> [out]  any cover file, optional output path
// Covers are 2880×1800 and share scripts/covers/cover.css. Set CHROME to override the browser path.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [arg, outArg] = process.argv.slice(2);
if (!arg) {
  console.error('Usage: pnpm cover <slug> | <file.html> [out.png]');
  process.exit(1);
}

const src = arg.endsWith('.html')
  ? path.resolve(arg)
  : path.join(root, 'scripts/covers', `${arg}.html`);
if (!existsSync(src)) {
  console.error(`No cover source at ${path.relative(root, src)}`);
  process.exit(1);
}
const out = outArg
  ? path.resolve(outArg)
  : path.join(root, 'content/projects/images', `${path.basename(src, '.html')}.png`);

const chrome =
  process.env.CHROME ??
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find(existsSync);
if (!chrome) {
  console.error('Chrome not found; set CHROME=/path/to/chrome');
  process.exit(1);
}

execFileSync(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=2880,1800',
    '--virtual-time-budget=3000',
    '--allow-file-access-from-files',
    `--screenshot=${out}`,
    pathToFileURL(src).href,
  ],
  { stdio: ['ignore', 'ignore', 'ignore'] },
);
console.log(path.relative(root, out) || out);
