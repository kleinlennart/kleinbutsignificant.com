# Themes

- https://github.com/adityatelange/hugo-PaperMod
- `PaperMod` used to be the old version, now name of submodule - change?
- current theme version: latest (see commit SHA)
- not sure how many changes I've made to the theme itself...
- update theme with `blogdown::install_theme("adityatelange/hugo-PaperMod", force = TRUE)`


## Customizing Themes
https://bookdown.org/yihui/blogdown/custom-layouts.html
https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#override-theme-template
https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#custom-head--footer

-> Hugo's Lookup Order

- potentially "a few lightweight template files under layouts/ in the theme, so that you can override them without touching the core template files"
- The way that you customize these files is not to edit them directly in the theme folder, but to create a directory `layouts/partials/` under the root directory of your website

## Update 

https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-installation/#installingupdating-papermod

In main home folder run:

```bash
git submodule update --remote --merge
```

-> make sure to rerun readme afterwards: `rmarkdown::render("README.Rmd")`

