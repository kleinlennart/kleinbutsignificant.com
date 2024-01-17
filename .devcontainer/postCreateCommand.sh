#!/usr/bin/bash 
# postCreateCommand.sh

# fix X11 bug
sudo apt-get update -y && sudo apt-get install -y libxt6

# pull theme submodule into folder
git submodule init && git submodule update


# https://github.com/rocker-org/devcontainer-features/tree/main/src/quarto-cli#execution-engine
# "postCreateCommand": "python3 -m pip install jupyter"

# Chromium may be required to render documents containing diagrams code blocks such as {mermaid} and {dot} into non-HTML formats.
# https://github.com/rocker-org/devcontainer-features/tree/main/src/quarto-cli
# quarto tools install chromium
# possible?