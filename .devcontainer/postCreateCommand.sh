#!/usr/bin/bash 
# postCreateCommand.sh

# fix X11 bug
sudo apt-get update -y && sudo apt-get install -y libxt6

# pull theme submodule into folder
git submodule init && git submodule update