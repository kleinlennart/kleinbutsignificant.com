# blogdown::check_site()

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

