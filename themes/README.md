# Themes

- https://github.com/adityatelange/hugo-PaperMod
- `PaperMod` is the old version
- current theme version: 7.0 ?? 
- not sure how many changes I've made to the theme itself...
- update theme with `blogdown::install_theme("adityatelange/hugo-PaperMod", force = TRUE)`


## Customizing Themes
https://bookdown.org/yihui/blogdown/custom-layouts.html
https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#override-theme-template
https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#custom-head--footer

-> Hugo's Lookup Order

- potentially "a few lightweight template files under layouts/ in the theme, so that you can override them without touching the core template files"
- The way that you customize these files is not to edit them directly in the theme folder, but to create a directory `layouts/partials/` under the root directory of your website