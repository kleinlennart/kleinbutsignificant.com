---
title: In Search for the Perfect Palette
author: Lennart Klein
date: '2023-08-04'
slug: perfect-palette
categories:
  - Data Science
tags:
  - R
  - data-viz
  - color
# cover:
#     linkFullImages: true
#     image: "https://assets-global.website-files.com/620d42e86cb8ec4d0839e59d/622f95de676fccd3d9f0483b_Color%20Palettes%20Image_0314122.jpg"
#     alt: "<alt text>" # alt text
#     caption: "<text>" # display caption under cover
#     relative: false # when using page bundles set this to true
#     hidden: false # only hide on current single page
# bibliography: references.bib
format: hugo-md
fig-height: 4.5
code-fold: false
---

Three types of palettes:

1.  discriminate

2.  qualitative

3.  smooth

Okabe

``` r
mpg %>%
  ggplot(aes(x = displ, y = hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth()
```

<img src="index.markdown_strict_files/figure-markdown_strict/plot%20normal%20color-1.png" width="4800" />

``` r
mpg %>%
  ggplot(aes(x = displ, y = hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth() +
  paletteer::scale_color_paletteer_d("colorblindr::OkabeIto_black")
```

<img src="index.markdown_strict_files/figure-markdown_strict/plot%20OkabeIto-1.png" width="4800" />
