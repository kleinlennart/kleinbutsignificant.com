---
title: Style guide
date: '2026-11-07'
description: Every element the site styles, in one place. Draft, so it only shows in dev.
tags: [meta]
archive: true
draft: true
---

Body text is set in Source Serif 4, UI in Source Sans 3. Footnotes become sidenotes in the margin on wide screens.[^1] On phones they fall back to regular footnotes at the end.[^long]

Obsidian links work: [[perfect-palette]], with a label: [[commit-badge|the badge post]], to a page: [[about]], and a missing one: [[not-written-yet]].

Embedded attachment, resolved by file name like Obsidian does:

![[badge_params.png|Badge parameters]]

> [!note] A callout
> Obsidian-style callouts render with `rehype-callouts`.

> [!warning]- Collapsible
> Hidden until opened.

## A second-level heading

> A blockquote, for quoting someone else.

| Indicator | 2023 | 2024 |
|---|---:|---:|
| Mandates tracked | 1,204 | 1,388 |
| Share digitised | 61% | 78% |

```r
library(ggplot2)
ggplot(mpg, aes(displ, hwy)) + geom_point()
```

Inline `code`, **bold**, *italic*, and a [regular link](https://quarto.org).

[^1]: Like this one, set in the margin next to the line that references it.
[^long]: A longer note with a [link](https://edwardtufte.github.io/tufte-css/) to show that inline markup survives the move into the margin.
