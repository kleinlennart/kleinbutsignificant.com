#!/usr/bin/env bash

## Versions
hugo version
quarto check
jupyter --version
R --version

## Update Theme Submodule 
git submodule update --remote --merge


## Prepare pip
python3 -m pip install --upgrade pip
python3 -m pip --version

## Update Python Packages
python3 -m pip install -r .devcontainer/requirements.txt --upgrade
python3 -m pip freeze > .devcontainer/requirements.txt







