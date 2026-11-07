---
title: Using GitHub Codespaces for Quarto Development
date: '2024-01-17'
tags:
- Data Science
- quarto
- snippet
- R
- github
- docker
- devcontainer
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
