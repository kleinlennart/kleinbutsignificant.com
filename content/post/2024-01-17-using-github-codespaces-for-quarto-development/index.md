---
title: Using GitHub Codespaces for Quarto Development
author:
  - Lennart Klein
date: '2024-01-17'
slug: []
categories:
  - Data Science
tags:
  - quarto
  - snippet
  - R
  - github
  - docker
  - devcontainer
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
# jupyter: python3

editor: 
  markdown: 
    wrap: 72
    
knitr:
  opts_chunk: 
    collapse: true
    comment: "#>" 
    R.options:
      knitr.graphics.auto_pdf: true
cover: 
  image: "badge_params.png" # image path/url
  alt: "<alt text>" # alt text
  caption: "<text>" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: true # only hide on current single page
---

It turns out, when I am working on say a `reveal.js` slide deck and I
need a lot of instant feedback, `quarto preview` renders pretty slowly
on my machine.

To speed up the process, and also allow me to tweak slides and blog
articles from any machine, I started using [GitHub
Codespaces](https://github.com/features/codespaces "https://github.com/features/codespaces").

To set it up correctly, I settled on this `devcontainer.json` for now:

**devcontainer.json**

``` json
{
    "name": "R + Quarto Codespace",
    "image": "ghcr.io/rocker-org/devcontainer/tidyverse:4.3",
    
    "features": {
        "ghcr.io/rocker-org/devcontainer-features/r-packages:1": {
            "packages": "blogdown",
            "installSystemRequirements" : true
        }
    },
  
    // fix current X11 error
    "postCreateCommand": "sudo apt-get update -y && sudo apt-get install -y libxt6",
    
    // run every time the container starts
    "postStartCommand": "quarto check",

    "customizations": {
        "vscode": {
      "extensions": [
        "quarto.quarto"
      ]
    }
    }

    // Uncomment to connect as root instead.
    // More info: https://aka.ms/dev-containers-non-root.
    // "remoteUser": "root"

}
```

The container is based on the [Devcontainer
Template](https://github.com/rocker-org/devcontainer-templates/tree/main/src/r-ver "https://github.com/rocker-org/devcontainer-templates/tree/main/src/r-ver")
and the R package installer
[Feature](https://github.com/rocker-org/devcontainer-features/tree/main/src/r-packages "https://github.com/rocker-org/devcontainer-features/tree/main/src/r-packages")
from the [Rocker
Project](https://rocker-project.org/ "https://rocker-project.org/").

### Learn more

-   <https://github.com/rocker-org/devcontainer-features/tree/main/src/r-packages>

-   <https://rocker-project.org/images/devcontainer/images.html>
