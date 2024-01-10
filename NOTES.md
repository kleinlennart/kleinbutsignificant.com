# Blog Dev Notes

https://github.com/quarto-dev/quarto-cli/issues/6435#issuecomment-1706326046
- Quarto is not meant to manage Hugo and quarto preview is just a convenient way to run hugo serve --port {port} --bind {host} --navigateToChanged for the user.


## _environment
- https://quarto.org/docs/projects/environment.html
- https://github.com/quarto-dev/quarto-cli/issues/6435#issuecomment-1706326046

- With Quarto, you would need to add the hugo command path you want to use in the PATH variable for the project. Using environment variables feature from Quarto could help do that at project level and not system wise.

## .lintr
- https://lintr.r-lib.org/
- no comments in file!
- create file with lintr::use_lintr(type = "tidyverse")
- Default tidyverse setting:
  - linters: linters_with_defaults() # see vignette("lintr")


