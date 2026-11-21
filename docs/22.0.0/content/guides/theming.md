---
label: Theming
description: Restyle skeleton items with --ngx-skeleton-loader-* CSS custom properties, the theme input and a provider theme with extendsFromRoot.
order: 3
tags: [ "guides", "theming" ]
keywords: [ "css variables", "custom properties", "dark mode", "theme", "extendsFromRoot", "inline styles" ]
icon: palette
---

# Theming

There are two ways to style the items, and they combine:

1. **CSS custom properties**: set them on any ancestor (or on `:root`) to restyle many loaders at once.
2. **The `theme` input**: inline styles applied to every item of one loader, or to every loader through the provider.

## CSS custom properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--ngx-skeleton-loader-color` | `rgb(239 241 246)` | Item background. |
| `--ngx-skeleton-loader-highlight` | `rgb(255 255 255 / 60%)` | `progress` shimmer color. |
| `--ngx-skeleton-loader-highlight-dark` | `rgb(0 0 0 / 20%)` | `progress-dark` shimmer color. |
| `--ngx-skeleton-loader-pulse-dark-color` | `rgb(50 50 50 / 20%)` | `pulse-dark` item background. |
| `--ngx-skeleton-loader-height` | `20px` | Line height. |
| `--ngx-skeleton-loader-radius` | `4px` | Line corner radius. |
| `--ngx-skeleton-loader-shape-size` | `40px` | Circle and square width and height. |
| `--ngx-skeleton-loader-gap` | `10px` | Space below each item. |
| `--ngx-skeleton-loader-duration` | `2s` (progress), `1.5s` (pulse) | Animation duration. |

```css
:root {
  --ngx-skeleton-loader-color: #e5e7eb;
  --ngx-skeleton-loader-radius: 8px;
}
```

## Dark mode

Override the variables under your dark theme selector:

```css
:root {
  --ngx-skeleton-loader-color: rgb(239 241 246);
  --ngx-skeleton-loader-highlight: rgb(255 255 255 / 60%);
}

[data-theme='dark'] {
  --ngx-skeleton-loader-color: #2a2f3a;
  --ngx-skeleton-loader-highlight: rgb(255 255 255 / 8%);
}
```

Or follow the system preference:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --ngx-skeleton-loader-color: #2a2f3a;
    --ngx-skeleton-loader-highlight: rgb(255 255 255 / 8%);
  }
}
```

## The theme input

`theme` takes the same values as a `[style]` binding and applies them to every item of the loader. CSS custom
properties are accepted too.

```html
<ngx-skeleton-loader [theme]="{ width: '80%', height: '12px', 'border-radius': '6px' }" />
<ngx-skeleton-loader [theme]="{ '--ngx-skeleton-loader-color': '#fde68a' }" />
```

For `circle` and `square` items, the `size` input wins over `width` and `height` from the theme.

## A theme for every loader

`provideSkeletonLoader({ theme })` sets a default theme. By default an instance `theme` **replaces** it; set
`extendsFromRoot: true` in the provider theme to **merge** instance themes over it instead.

```typescript
provideSkeletonLoader({
  theme: { extendsFromRoot: true, height: '14px', 'border-radius': '7px' },
});
```

```html
<!-- Items get height 14px, border-radius 7px and width 50%. -->
<ngx-skeleton-loader [theme]="{ width: '50%' }" />
```

| Provider theme | Instance theme | Applied styles |
|----------------|----------------|----------------|
| `{ height: '14px' }` | none | `height: 14px` |
| `{ height: '14px' }` | `{ width: '50%' }` | `width: 50%` |
| `{ extendsFromRoot: true, height: '14px' }` | `{ width: '50%' }` | `height: 14px; width: 50%` |
| `{ extendsFromRoot: true, height: '14px' }` | `{ height: '20px' }` | `height: 20px` |
| any | `null` | the provider theme is replaced by nothing (no inline styles), unless it extends from root |

`extendsFromRoot` itself is never applied as a style.

## Host class

The host element carries the `ngx-skeleton-loader` class and each item the `skeleton-loader` class, plus the
appearance (`circle`, `square`, `custom-content`) and the animation (`progress`, `progress-dark`, `pulse`,
`pulse-dark` or `no-animation`). Prefer the CSS variables above: they are the supported theming surface.
