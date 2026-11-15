# STYLE

## Writing

- use Oxford comma

## Project covers

- Screenshots where the project has a site worth showing (16:10, 2880×1800).
- Otherwise a made cover: `scripts/covers/<slug>.html`, rendered with `pnpm cover <slug>` to `content/projects/images/<slug>.png` (headless Chrome).
- Every made cover links `scripts/covers/cover.css` and uses its tokens: background `#f5f4f2` (same as the Fun covers), white tiles with the shared shadow, Source Sans 3 for the name, `.line` bars for abstract text. Don't hard-code new colours there; add a token if one is missing.
- Example: `scripts/covers/zotero-quick-highlight.html`.
