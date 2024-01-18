#!/usr/bin/bash 
# postCreateCommand.sh

# fix X11 bug
sudo apt-get update -y && sudo apt-get install -y libxt6

# pull theme submodule into folder
git submodule init && git submodule update


# https://github.com/rocker-org/devcontainer-features/tree/main/src/quarto-cli#execution-engine
python3 -m pip install --upgrade pip

## Essential for quarto
python3 -m pip install jupyter
python3 -m pip install jupyter-cache
# quarto check jupyter

## Install all other env packages
python3 -m pip install -r ./.devcontainer/requirements.txt
# python3 -m pip freeze > ./.devcontainer/requirements.txt

# https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/setting-up-your-python-project-for-codespaces
# // Use 'postCreateCommand' to run commands after the container is created.
# "postCreateCommand": "pip3 install --user -r requirements.txt",

# "postCreateCommand": "echo 'options(repos = c(CRAN = \"https://cloud.r-project.org\"))' | sudo sh -c 'cat - >>\"${R_HOME}/etc/Rprofile.site\"'",
