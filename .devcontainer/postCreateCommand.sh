#!/usr/bin/bash 
# postCreateCommand.sh

# fix X11 bug
sudo apt-get update -y && sudo apt-get install -y libxt6

# pull theme submodule into folder
git submodule init && git submodule update


# https://github.com/rocker-org/devcontainer-features/tree/main/src/quarto-cli#execution-engine
# "postCreateCommand": "python3 -m pip install jupyter"



# "postCreateCommand": "echo 'options(repos = c(CRAN = \"https://cloud.r-project.org\"))' | sudo sh -c 'cat - >>\"${R_HOME}/etc/Rprofile.site\"'",
