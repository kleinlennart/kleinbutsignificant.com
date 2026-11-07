---
title: In Search for the Perfect Palette
date: '2023-08-04'
tags:
- Data Science
- R
- data-viz
- color
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

![](index.markdown_strict_files/figure-markdown_strict/plot%20normal%20color-1.svg)

``` r
mpg %>%
  ggplot(aes(x = displ, y = hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth() +
  paletteer::scale_color_paletteer_d("colorblindr::OkabeIto_black")
```

![](index.markdown_strict_files/figure-markdown_strict/plot%20OkabeIto-1.svg)
