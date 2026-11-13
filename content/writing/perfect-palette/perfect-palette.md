---
title: In Search of the Perfect Palette
date: '2023-08-04'
updated: '2026-11-13'
tags:
  - data science
  - R
  - data vizualisation
  - color
  - color blindness
archive: true
fig-height: 4.5
execute:
  enabled: true
---


Three types of palettes:

1.  discriminate

2.  qualitative

3.  smooth

### The {ggplot2} default colors

``` r
ggplot(mpg, aes(displ, hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth()
```

![](perfect-palette.markdown_strict_files/figure-markdown_strict/plot-default-1.svg)

-\> not color blindness friendly

### Quick switch to `Okabe-Ito`

``` r
ggplot(mpg, aes(displ, hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth() +
  scale_colour_manual(values = palette.colors(palette = "Okabe-Ito"))
```

![](perfect-palette.markdown_strict_files/figure-markdown_strict/plot-okabe-ito-1.svg)

The Nature standard in academic publishing. See @wong2011PointsView.
