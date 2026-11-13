# [kleinbutsignificant.com](https://www.kleinbutsignificant.com)

Personal site of Lennart Klein: projects, writing, CV and art.

**v2** is hand-built with [Astro](https://astro.build). Posts are written in Markdown in an [Obsidian](https://obsidian.md) vault (`content/`), and computational posts in [Quarto](https://quarto.org), rendered locally with R packages from [rv](https://github.com/A2-ai/rv) and Python from [uv](https://docs.astral.sh/uv/). The site is hosted on Vercel.

v1 (2021–2024, Hugo + PaperMod + blogdown) lives on as tag [`v1`](../../tree/v1) and branch [`archive/v1`](../../tree/archive/v1).

## Develop

```sh
pnpm install
pnpm dev         # http://localhost:4321
pnpm build       # static site in dist/
```

## Write

- **Plain post:** create `content/writing/<slug>/<slug>.md` with `title`, `date`, `tags`, and `draft: true` while you work on it.
- **Computational post:** create `<slug>.qmd` in the same kind of folder, then run `uv sync && rv sync` once, then `uv run quarto render content/writing/<slug>/<slug>.qmd`. Commit the generated `.md`, the `_files/` and `_freeze/`.
- **Project:** copy `content/projects/_template.md`.
- **Headshot / intro:** edit `content/pages/home.md`.

Open `content/` as an Obsidian vault to write there. Wikilinks, `![[image]]` embeds, callouts and footnotes (shown as sidenotes) all render on the site.
