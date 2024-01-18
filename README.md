
<!-- README.md is generated from README.Rmd. Please edit that file -->

# [kleinbutsignificant.com](https://www.kleinbutsignificant.com)

<!-- badges: start -->

[![Netlify
Status](https://api.netlify.com/api/v1/badges/7fcdb00f-8ea5-499d-a803-2a61544f74f7/deploy-status)](https://app.netlify.com/sites/kleinbutsignificant/deploys)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.kleinbutsignificant.com&link=https%3A%2F%2Fwww.kleinbutsignificant.com)](https://www.kleinbutsignificant.com)
[![GitHub commits since tagged
version](https://img.shields.io/github/commits-since/adityatelange/hugo-PaperMod/d6cd6d91757c6966a6573c21c0311ba5d957263f?style=flat&logo=github&label=Commits%20since%20last%20theme%20submodule%20pull)](https://github.com/adityatelange/hugo-PaperMod/compare/d6cd6d91757c6966a6573c21c0311ba5d957263f...master)

<!-- [![GitHub commits since tagged version](https://img.shields.io/github/commits-since/adityatelange/hugo-PaperMod/d6cd6d91757c6966a6573c21c0311ba5d957263f?style=flat&logo=github&label=Commits%20since%20last%20theme%20submodule%20pull)](https://github.com/adityatelange/hugo-PaperMod/compare/d6cd6d91757c6966a6573c21c0311ba5d957263f...master) -->
<!-- https://shields.io/badges/git-hub-commits-since-tagged-version -->
<!-- https://github.com/adityatelange/hugo-PaperMod/commits/master -->
<!-- https://github.com/adityatelange/hugo-PaperMod/compare/master...21ae19bc2b02089a234509bd4d4bb3a72659999a -->

![Hugo](https://img.shields.io/badge/Hugo-black.svg?style=for-the-badge&logo=Hugo)
![RStudio](https://img.shields.io/badge/RStudio-4285F4?style=for-the-badge&logo=rstudio&logoColor=white)

<!-- ![R](https://img.shields.io/badge/r-%23276DC3.svg?style=for-the-badge&logo=r&logoColor=white) -->
<!-- badges: end -->

## TODOs

- fix summary text in list cards (avoid title), instead use description
  field

- italics in post titles (markdown, html, or Go)

- change search logo to Mac on all platforms

- get emojis to work

- setup python environment local for blog

- start writing

  - About

- CV download

- add email contact

- add GitHub CI

  - run `hugo -v` / `build_site` from source repo and export
    automatically to pages

## Hugo

- <https://gohugo.io/getting-started/directory-structure/>

## Python

pip install jupyter-cache or conda-forge

## Devcontainer & GitHub Codespaces

## RStudio

- <https://github.com/rocker-org/devcontainer-features/blob/main/src/rstudio-server/install.sh>
- `RSTUDIO_DATA_DIR=/usr/local/share/rocker-devcontainer-features/rstudio-server/data`

**Config:**

- /etc/rstudio/rserver.conf

- /etc/rstudio/rsession.conf

- /etc/rstudio/logging.conf

  - <https://docs.posit.co/ide/server-pro/server_management/logging.html>
  - -\> /var/log/rstudio/rstudio-server

- <https://support.posit.co/hc/en-us/articles/200552316-Configuring-the-Server>

- RStudio User config: `/home/rstudio`

<!-- -->

    $ sudo rstudio-server verify-installation
