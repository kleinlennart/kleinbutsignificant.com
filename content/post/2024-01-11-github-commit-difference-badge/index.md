---
title: GitHub Commit Difference Badge
author: Lennart Klein
date: 2024-01-11
slug: [commit-badge]
categories:
  - Tech
tags:
  - utils
  - git
  - github
  - R
  - markdown
  - snippet
# description: 
# summary: 
# series:
# ShowToc: yes
# TocOpen: yes
draft: false # Quarto only shows non-drafts
format:
  hugo-md:
    mermaid-format: png # js, png, and svg
    code-annotations: true
    code-overflow: wrap

editor: 
  markdown: 
    wrap: 72
    
cover: 
  image: "badge_params.png" # image path/url
  alt: "<alt text>" # alt text
  caption: "<text>" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: true # only hide on current single page

# execute: 
  # enabled: true # need to manually change .md file badges because Quarto fucks them up
  # freeze: true
---

### TL;DR

-   Create a [Shields.io](https://shields.io/ "https://shields.io/")
    badge for your GitHub `README.md` to track the number of commits
    since a specific commit

-   In my case, I set the base/reference point to the last commit to the
    repo of my blog's
    [theme](https://github.com/adityatelange/hugo-PaperMod/tree/master "hugo-PaperMod")
    which I added as a `git submodule`[^1] to the `themes/` folder of my
    blog[^2]

-   Using [R
    Markdown](https://rmarkdown.rstudio.com/ "https://rmarkdown.rstudio.com/"),
    I have my badge automatically update to the current status of my
    submodule and rendered out to my `README.md`

-   Finally, I wrap the badge in a link to [GitHub Commit
    Compare](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits "https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits")
    to quickly see all the recent changes to the theme before I pull
    them

[![](https://img.shields.io/github/commits-since/adityatelange/hugo-PaperMod/71ce72b1bfb868b406c369c958f8682c63940e01?style=flat&logo=github&label=Commits%20since%20last%20theme%20submodule%20pull)](https://github.com/adityatelange/hugo-PaperMod/compare/71ce72b1bfb868b406c369c958f8682c63940e01...master)


### How it works

<img src="index_files/figure-markdown_strict/mermaid-figure-1.png" style="width:6.84in;height:0.48in" />

-   NOTE: you can set up the baseline for this README workflow with the
    help of `usethis::use_readme_rmd()`

#### Getting the git ref

``` r
get_theme_sha <- function(theme_dir = NULL) {
  submodule <- git2r::repository(
    path = here::here("themes", theme_dir)
  )

  sha <- submodule |>
    git2r::repository_head() |>
    git2r::sha()
  return(sha)
}

get_theme_sha(theme_dir = "PaperMod")
```

    [1] "71ce72b1bfb868b406c369c958f8682c63940e01"

#### Creating the badge

``` r
commit_badge <- function(user = NULL, repo = NULL, sha = NULL) {
  glue::glue("[![GitHub commits since tagged version](https://img.shields.io/github/commits-since/{user}/{repo}/{sha}?style=flat&logo=github&label=Commits%20since%20last%20theme%20submodule%20pull)](https://github.com/{user}/{repo}/compare/{sha}...master)")
}

badge <- commit_badge(
  user = "adityatelange",
  repo = "hugo-PaperMod",
  sha = get_theme_sha(theme_dir = "PaperMod")
)

badge
```

    [![GitHub commits since tagged version](https://img.shields.io/github/commits-since/adityatelange/hugo-PaperMod/71ce72b1bfb868b406c369c958f8682c63940e01?style=flat&logo=github&label=Commits%20since%20last%20theme%20submodule%20pull)](https://github.com/adityatelange/hugo-PaperMod/compare/71ce72b1bfb868b406c369c958f8682c63940e01...master)

To include the badge in your Markdown file, use [inline
code](https://quarto.org/docs/computations/inline-code.html "https://quarto.org/docs/computations/inline-code.html"):

``` r
`r badge`

`r commit_badge(user = "adityatelange", repo = "hugo-PaperMod",
                sha = get_theme_sha(theme_dir = "PaperMod"))`
```

[![](https://img.shields.io/github/commits-since/adityatelange/hugo-PaperMod/71ce72b1bfb868b406c369c958f8682c63940e01?style=flat&logo=github&label=Commits%20since%20last%20theme%20submodule%20pull)](https://github.com/adityatelange/hugo-PaperMod/compare/71ce72b1bfb868b406c369c958f8682c63940e01...master)

Also works with `knitr::include_graphics()`

------------------------------------------------------------------------

### Appendix: The shield.io badge specs

:link: <https://shields.io/badges/git-hub-commits-since-tagged-version>

<!-- Badge Parameter at Shields.io -->

![](badge_params.png)

<!-- {{< gist kleinlennart a821c64a2ad29890bffb9a22ad03a146 >}} -->

[^1]: Learn more about submodules here:
    <https://git-scm.com/book/en/v2/Git-Tools-Submodules>

[^2]: This blog is based on
    [{blogdown}](https://github.com/rstudio/blogdown "https://github.com/rstudio/blogdown")
    and [Hugo](https://gohugo.io/ "https://gohugo.io/"), which uses a
    very specific [directory
    structure](https://gohugo.io/getting-started/directory-structure/#directories "https://gohugo.io/getting-started/directory-structure/#directories").
