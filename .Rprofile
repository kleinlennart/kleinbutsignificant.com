source("rv/scripts/rvr.R")
source("rv/scripts/activate.R")
# Project R profile. Package library is managed by rv (see rproject.toml);
# The two source() lines above are rv's activation (added by `rv init`).

# Python chunks in R posts (knitr + reticulate) use the project's uv environment (pyproject.toml),
# so packages added with `uv add` are available there too. This overrides Quarto, which points
# RETICULATE_PYTHON at the base interpreter (no project packages). R starts in the project root.
# Keep the venv path as is: bin/python is a symlink to the base interpreter, and resolving it
# (normalizePath) would lose the venv and its packages.
local({
  venv <- Sys.getenv("VIRTUAL_ENV") # set by `uv run`
  if (!nzchar(venv) && dir.exists(".venv")) venv <- file.path(getwd(), ".venv")
  py <- file.path(venv, "bin", "python")
  if (nzchar(venv) && file.exists(py)) Sys.setenv(RETICULATE_PYTHON = py)
})

if (file.exists("~/.Rprofile")) {
  base::sys.source("~/.Rprofile", envir = environment())
}
