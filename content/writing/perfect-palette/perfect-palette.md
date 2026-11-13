---
title: In Search for the Perfect Palette
date: '2023-08-04'
tags:
  - data science
  - R
  - data-viz
  - color
archive: true
fig-height: 4.5
execute:
  enabled: true
---


Three types of palettes:

1.  discriminate

2.  qualitative

3.  smooth

``` r
mpg %>%
  ggplot(aes(x = displ, y = hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth()
```

![](perfect-palette.markdown_strict_files/figure-markdown_strict/plot%20normal%20color-1.svg)

``` r
mpg %>%
  ggplot(aes(x = displ, y = hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth() +
  paletteer::scale_color_paletteer_d("colorblindr::OkabeIto_black")
```

![](perfect-palette.markdown_strict_files/figure-markdown_strict/plot%20OkabeIto-1.svg)

From @wong2011PointsView.
