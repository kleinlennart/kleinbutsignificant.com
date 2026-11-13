# [kleinbutsignificant.com](https://www.kleinbutsignificant.com)

Personal site of Lennart Klein: projects, writing, CV and art.

**v2** is hand-built with [Astro](https://astro.build). Posts are written in Markdown in an [Obsidian](https://obsidian.md) vault (`content/`), and computational posts in [Quarto](https://quarto.org), rendered locally with R packages from [rv](https://github.com/A2-ai/rv) and Python from [uv](https://docs.astral.sh/uv/). The site is hosted on Vercel.

v1 (2021–2024, Hugo + PaperMod + blogdown) lives on as tag [`v1`](../../tree/v1) and branch [`archive/v1`](../../tree/archive/v1).

## Develop

```sh
pnpm install
pnpm dev         # http://localhost:4321
pnpm build       # static site in dist/
pnpm check       # types + content schemas
pnpm lint        # oxlint
pnpm format      # Prettier
```

## Write

- **New post:** `pnpm new` (or the VS Code task "new post") asks for a title and a type: plain Markdown, Quarto + R, Quarto + Python or MDX. It creates `content/writing/<slug>/<slug>.<ext>` from `templates/`, dated today with `draft: true`, and opens it in VS Code. Shortcut: `pnpm new --type r "My post"`.
- **Computational post:** run `uv sync && rv sync` once, then `pnpm render <slug>` (or the task "render post" with the `.qmd` open). Commit the generated `.md`, `<slug>.markdown_strict_files/` and `_freeze/`.
- **Publish:** delete `draft: true`. Add `archive: true` to file a post under Writing → Archive.
- **Project:** copy `content/projects/_template.md`.
- **Headshot / intro:** edit `content/pages/home.md`.

Open `content/` as an Obsidian vault to write there. Wikilinks, `![[image]]` embeds, callouts and footnotes (shown as sidenotes) all render on the site.
