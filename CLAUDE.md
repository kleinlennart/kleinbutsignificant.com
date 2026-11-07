# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal blog/website (kleinbutsignificant.com): a **Hugo** site using the **PaperMod** theme, with computational posts authored in **R Markdown (blogdown)** or **Quarto**. Deployed by Netlify, which only runs `hugo` — it never executes R/Python. Every rendered `.md`/`.html` output must therefore be committed alongside its source.

## Rendering pipeline (the key thing to understand)

Two pre-render paths both produce files Hugo can consume; Hugo itself ignores the sources (`ignoreFiles` in [config.yaml](config.yaml) excludes `.Rmd`, `.qmd`, `.ipynb`, `.py`):

- **Quarto** (`index.qmd` → `index.md`, format `hugo-md`): configured in [_quarto.yml](_quarto.yml) as a `project: type: hugo`. Execution uses `freeze: true` + `cache: true`, so posts are **not re-executed** on a project render; frozen results live in `_freeze/` and are committed. To re-run a post's code, render that file explicitly (or delete its `_freeze/` entry). The `render:` list restricts Quarto to `*/*.qmd` and `*/*.Rmd` and excludes `archetypes/` plus specific posts.
- **blogdown** (`index.Rmd` → `index.html` via Pandoc, `blogdown.method = "html"`): options set in [.Rprofile](.Rprofile). `knit.on_save` is off, so Rmd posts are built manually. Note that Quarto's `render:` list also matches `*/*.Rmd`, so some Rmd posts have both `index.html` and `index.md` committed while others have only `index.md`. `blogdown::clean_duplicates()` removes duplicate outputs. Check which outputs a post already has before re-rendering it.

Root-level `index.Rmd` / `index.qmd` are tool markers for blogdown/Quarto — do not edit them. `README.md` is generated from `README.Rmd` (`rmarkdown::render("README.Rmd")`).

Posts are page bundles: `content/post/YYYY-MM-DD-slug/index.{qmd,Rmd,md}` plus `index_files/` support files. Plain-markdown posts are just `index.md`.

## Commands

Hugo is not necessarily on PATH locally; blogdown manages its own Hugo binary.

```sh
quarto render content/post/<post>/index.qmd   # render one Quarto post to index.md
quarto preview                                  # wraps `hugo serve` on port 4200; needs hugo on PATH (see NOTES.md re _environment)
hugo server -D                                  # plain Hugo dev server
hugo                                            # production build into public/ (gitignored)
```

New posts come from `archetypes/` (`quarto-post.md`, `default-post.md`, `full_post.md`). [archetypes/README.md](archetypes/README.md) documents `hugo new --kind post <name>`, and says a `.md` archetype can be used to create a `.qmd` file.

From R (see [maintenance.R](maintenance.R)):

```r
blogdown::serve_site(port = "4321")
blogdown::build_site(build_rmd = "md5sum")   # rebuild only changed Rmd posts
blogdown::check_site()                        # config / content / hugo / netlify checks
lintr::lint_dir()                             # .lintr: tidyverse defaults, 120-char lines
styler::style_dir(path = "content/")
```

[maintain.sh](maintain.sh) prints tool versions, updates the theme submodule, and upgrades/refreezes Python packages in `.devcontainer/requirements.txt`.

## Theme and customization

- `themes/PaperMod` is a **git submodule**. After cloning: `git submodule update --init --recursive`. Update with `git submodule update --remote --merge` (then re-render README, since it has a badge pinned to the theme commit SHA). Never edit files inside the theme.
- Overrides use Hugo's lookup order: files in root `layouts/` (partials such as `home_info.html`, `social_icons.html`, `footer.html`, `edit_post.html`) and `assets/css/` / `assets/js/` shadow the theme's files at the same relative paths. Because `assets/css/{common,core,includes,hljs}` and `assets/js/` sit at the theme's own paths, they shadow the theme's versions, so theme submodule updates will not reach those files. Site-specific styles go in `assets/css/extended/`, where every file is bundled automatically.
- Site params (menu, home-info content, social icons, search via Fuse.js which requires the `JSON` home output) are in [config.yaml](config.yaml). `markup.goldmark.renderer.unsafe: true` is required for Quarto/R raw-HTML output.

## Version pinning

The Hugo version (currently `0.121.2`) is pinned in three places that must be kept in sync: [.Rprofile](.Rprofile) (`blogdown.hugo.version`), [netlify.toml](netlify.toml) (`HUGO_VERSION`), and [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json). Check theme compatibility before bumping.

## Dev container

`.devcontainer/` provides a Codespaces image (rocker tidyverse + RStudio Server on 8787, Quarto, Hugo extended, Python/Jupyter from `requirements.txt`). `postCreateCommand.sh` initializes the theme submodule.
