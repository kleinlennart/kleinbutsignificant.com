# Business as usual --------------------------------------------------------

# blogdown::check_site()
# blogdown::serve_site(port = "4321") # fixed port, easier bookmarking
rmarkdown::render("README.Rmd")

# -------------------------------------------------------------------------

## `blogdown::update_hugo()` is defunct. Please use `blogdown::install_hugo()` instead.
# blogdown::install_hugo()

# potentially better to update hugo with brew
# can otherwise lead to conflict
# also with quarto and the version 
# https://github.com/quarto-dev/quarto-cli/issues/6435

## always check before if theme is still compatible
# brew can't downgrade

# brew update; brew upgrade hugo
# brew info hugo
# hugo version

# - change in .Rprofile
# - change in netlify.toml
# - restart session for changes in .Rprofile to take effect
# -> rebuild site locally

# blogdown::build_site()
# rmarkdown::render_site(encoding = 'UTF-8')
# blogdown::serve_site()
# blogdown::stop_server()

# find_hugo("all")


# update theme (on new branch)
# after clearing all the changes on local main
# or stashing them

# Update Theme ------------------------------------------------------------
## Method 1: clone 
# https://github.com/adityatelange/hugo-PaperMod/wiki/Installation#method-1
# https://github.com/adityatelange/hugo-PaperMod

## Method 2: Submodule (way to go!)
# https://github.com/adityatelange/hugo-PaperMod/wiki/Installation#method-2
# - allow continuous fetching of upstream changes with new versions
# usage: git submodule add [<options>] [--] <repository> [<path>]

# https://arc.net/l/quote/jattiwdw

# use commit SHA for v7.0 tag release
# SHA 25e5b4d2982aacfee9a1194d2738db284c2ac380
# need to copy full SHA from GitHub

# git submodule add --depth=1  https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
# git checkout <tag_or_commit_sha>

# git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)

## Update Submodule
# git submodule update --remote

## Releases: Note: You may use  "--branch v7.0" to end of above command if you want to stick to specific release.

## Method 3: Manual


## Method 4: Go & hugo CLI
# hugo mod get -u


