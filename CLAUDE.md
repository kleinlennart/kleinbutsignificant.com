# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site kleinbutsignificant.com, v2: a hand-built **Astro 7** static site (landing page, project portfolio, writing, CV, art). Hosted on **Vercel** (the domain stays on Netlify, serving v1, until cutover). v1 (Hugo + PaperMod + blogdown) is preserved as tag `v1` and branch `archive/v1`; v2 is developed on branch `v2`.

The owner makes the design decisions. Don't change visual design, crops, colours or copy beyond what was asked; propose changes instead. Open design questions and feedback live in `notes/`.

## Commands

```sh
pnpm dev           # http://localhost:4321; drafts are visible in dev only
pnpm dev:public    # same port, drafts hidden like production (DRAFTS=hide); only one dev server runs at a time
pnpm build         # static build into dist/ (drafts excluded)
pnpm check         # astro check (TypeScript + content schemas)
pnpm lint          # oxlint (also lints .astro frontmatter and scripts)
pnpm format        # Prettier on code; content/, notes/ and *.md are skipped (.prettierignore)
air format .       # R scripts (air.toml); chunks in .qmd/.Rmd: "Quarto: Format Cell" in the editor
uv run ruff format .   # Python scripts ([tool.ruff] in pyproject.toml)
uv run quarto render content/writing/<slug>/<slug>.qmd   # render one computational post
./maintain.sh      # versions + dependency upgrades (pnpm, uv, rv) + check/build
```

## Dev server (agents: read this before starting one)

- **Find the running server first.** `pnpm astro dev status` (or read `.astro/dev.json`: url, port, pid). The owner usually has one running on http://localhost:4321; use it.
- **Which mode:** `grep drafts .astro/dev.log` → `drafts visible (pnpm dev)` or `drafts hidden (pnpm dev:public)`. The log also holds request lines and errors, including for servers started in a normal terminal.
- **None running and you need one:** `pnpm dev --background` (or `pnpm dev:public --background`). It then shows in `astro dev status`, `pnpm astro dev logs` works, and the owner can see it. Stop it with `pnpm astro dev stop` when done.
- **Never** start a second server (`--ignore-lock`, other ports) and never `pkill` broadly; stop only a server you started. Port 4321 is fixed (`strictPort`).
- For a production check without touching the dev server: `pnpm build` and inspect `dist/`.

## Content (`content/` is also an Obsidian vault)

- `writing/<slug>/<slug>.md`: one folder per post. The folder name is the URL slug (`/writing/<slug>/`) and the note's file name, so Obsidian `[[wikilinks]]` resolve. Computational posts keep `<slug>.qmd` (or `.Rmd`) next to the rendered `<slug>.md` and `<slug>_files/`. Optional flags, both default `false`: `draft: true` (dev only) and `archive: true` (listed under Writing → Archive). For computational posts, set frontmatter in the `.qmd`/`.Rmd` too, or the next render overwrites it.
- `projects/*.md` (files starting with `_` are templates and are not published), `art/*.md` + `art/images/`, `pages/*.md` (single pages; `pages/home.md` feeds the landing page, including the `portrait` headshot), and `attachments/` (Obsidian's paste target).
- Schemas are in [src/content.config.ts](src/content.config.ts) and use Zod from `astro/zod`. Unknown frontmatter keys are stripped rather than rejected.
- `.qmd`/`.Rmd` are never loaded by Astro. Only `.md`/`.mdx` are.

## Markdown pipeline

[astro.config.mjs](astro.config.mjs) uses the `unified()` processor from `@astrojs/markdown-remark`. Astro 7 defaults to the native Sätteri processor, which can't run remark/rehype plugins. Custom plugins live in `src/plugins/`:
- `remark-obsidian.mjs`: `[[note]]`, `[[note|label]]` and `![[image.png]]`, resolved by file name across `content/`. Its `urlFor()` must match the routes in `src/pages/`.
- `rehype-sidenotes.mjs`: GFM footnotes become Tufte-style margin notes on wide screens, with plain footnotes on mobile. This is CSS-only, in `src/styles/prose.css`.
- `rehype-callouts` (Obsidian theme) handles `> [!note]` callouts.

[src/integrations/content-assets.mjs](src/integrations/content-assets.mjs) serves every non-source file in a post folder at the post URL, in dev and in build. Raw HTML from Quarto (`<img src="slug_files/...">`, htmlwidget libs) and embedded standalone HTML therefore work with relative paths. Markdown-syntax images are additionally optimised by Astro.

## Quarto / computational posts

- Render locally and commit the `.md`, the `_files/` and `_freeze/`. Vercel only runs `astro build` and has no R or Python.
- [_quarto.yml](_quarto.yml) is a plain project rendering `content/**/*.qmd` to `hugo-md` (Markdown + YAML; the name is historical), with `freeze: auto`. `commit-badge` is excluded because its code reads the removed v1 theme submodule.
- R packages: `rv` (`rproject.toml`, `rv.lock`, library in `rv/library/`, gitignored). `.Rprofile` sources rv's activation scripts.
- Python: `uv` (`pyproject.toml`). Running `uv run quarto render` lets Quarto find the venv's Jupyter.

## Design system

Tokens are in [src/styles/tokens.css](src/styles/tokens.css). The palette is currently black and white: `--color-accent` aliases `--color-fg`, ready for a colour later. Type is Source Sans 3 (UI) and Source Serif 4 (body), self-hosted via `@fontsource-variable`. Light and dark follow `prefers-color-scheme`. [src/pages/writing/style-guide](content/writing/style-guide/style-guide.md) is a draft post showing every styled element; use it to check visual changes.

## Redirects and deploy

- v1 `/post/*` URLs redirect to `/writing/*` (`redirects` in the Astro config). Slugs that changed are mapped explicitly.
- `netlify.toml` keeps deploying v1 from `master` until cutover: merge `v2` → `master`, point the Vercel production branch at `master`, move DNS, remove Netlify.
