# Layouts

https://bookdown.org/yihui/blogdown/custom-layouts.html

- partials override theme layouts
- "All files under layouts/ under the root directory will override files with the same relative paths under themes/"
- `layouts/index.html` defines the home page template (https://gohugo.io/templates/homepage/)


## Profile Mode

```yaml
params:
    profileMode:
        enabled: true
        title: "<Title>" # optional default will be site title
        subtitle: "This is subtitle"
        imageUrl: "<image link>" # optional
        imageTitle: "<title of image as alt>" # optional
        imageWidth: 120 # custom size
        imageHeight: 120 # custom size
        buttons:
            - name: Archive
            url: "/archive"
            - name: Github
            url: "https://github.com/"

    socialIcons: # optional
        - name: "<platform>"
            url: "<link>"
        - name: "<platform 2>"
            url: "<link2>"
```




## Shortcodes
> = Shortcodes are simple snippets inside your content files calling built-in or custom templates

- https://gohugo.io/content-management/shortcodes/
- `layouts/shortcodes/`
- In your content files, a shortcode can be called
- https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes
- https://bookdown.org/yihui/blogdown/content.html#shortcode
- use `blogdown::shortcode('tweet')` for the HUGO default shortcodes


```
.(site root)
├── config.yml
├── content/
├── theme/hugo-PaperMod/
└── layouts
    ├── partials
    │   ├── comments.html
    │   ├── extend_footer.html <---
    │   └── extend_head.html   <---
    └── robots.txt
```

https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#bundling-custom-css-with-themes-assets

```
.(site root)
├── config.yml
├── content/
├── theme/hugo-PaperMod/
└── assets/
    └── css/
        └── extended/  <---
            ├── custom_css1.css <---
            └── any_name.css   <---
```

All css files inside assets/css/extended will be bundled !


## Emoji in HTML
https://www.w3schools.com/charsets/ref_emoji.asp


## Variables

- https://github.com/adityatelange/hugo-PaperMod/wiki/Variables in config.yaml
- https://gohugo.io/variables/
- `.Site.Params.autor`



