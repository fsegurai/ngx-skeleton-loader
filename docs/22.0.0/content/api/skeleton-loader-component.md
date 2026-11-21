---
label: Skeleton Loader Component
description: Selectors, inputs, defaults, host attributes and rendered markup of SkeletonLoaderComponent.
order: 1
tags: [ "api", "component" ]
keywords: [ "SkeletonLoaderComponent", "ngx-skeleton-loader", "inputs", "count", "appearance", "animation", "size", "theme", "ariaLabel", "loadingText" ]
icon: widgets
---

# SkeletonLoaderComponent

```typescript
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';
```

| | |
|---|---|
| Selectors | `ngx-skeleton-loader`, `skeleton-loader`, `[skeleton-loader]` |
| Standalone | Yes |
| Change detection | `OnPush`; all inputs are signal inputs. |
| Content projection | Only with `appearance="custom-content"`. |

## Inputs

Each input falls back to the [provider](provide-skeleton-loader.md) value, then to the built-in default.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `count` | `number` (any value is converted) | `1` | Number of items. Values below `1` or not a number fall back to `1`; decimals are rounded down. Always `1` for `custom-content`: the provider `count` does not apply, an explicit different value is forced to `1` (logged in development mode). |
| `appearance` | `SkeletonLoaderAppearance` | `'line'` | `'line'`, `'circle'`, `'square'` or `'custom-content'`. Unknown values fall back to `'line'`. |
| `animation` | `SkeletonLoaderAnimation` | `'progress'` | `'progress'`, `'progress-dark'`, `'pulse'`, `'pulse-dark'`; `false` or `'false'` disables it. Unknown values disable it. |
| `size` | `SkeletonLoaderSize \| null` | none | Width and height of `circle` and `square` items in pixels: a number, `'48'` or `'48px'`. Invalid values are ignored. |
| `theme` | `SkeletonLoaderTheme \| null` | none | Inline styles (and CSS custom properties) of every item. Replaces the provider theme unless it sets `extendsFromRoot: true`. |
| `ariaLabel` | `string` | `'loading'` | Accessible name of the status region (`aria-label` of the host). |
| `loadingText` | `string` | `'Loading...'` | Visually hidden text announced by screen readers. |
| `announce` | `boolean` (attribute strings are converted) | `true` | `false` makes the loader decorative (`aria-hidden="true"`, no status role, label or loading text) so a region you label yourself announces several loaders once. |

## Host

With `announce` set to `false` the host only has `class` (and `data-skeleton-offscreen` when applicable) plus
`aria-hidden="true"`; the status attributes below and the hidden loading text are not rendered.

| Attribute | Value |
|-----------|-------|
| `class` | `ngx-skeleton-loader` |
| `role` | `status` |
| `aria-live` | `polite` |
| `aria-busy` | `true` |
| `aria-label` | The effective `ariaLabel`. |
| `data-skeleton-offscreen` | Present while the loader is outside the viewport (200px margin); its animations are removed. See [Performance](../guides/performance.md). |

## Rendered items

Each item is a `<span class="skeleton-loader" aria-hidden="true">` with these extra classes:

| Class | When |
|-------|------|
| `circle`, `square`, `custom-content` | The effective appearance (no class for `line`). |
| `progress`, `progress-dark`, `pulse`, `pulse-dark` | The effective animation. |
| `no-animation` | Animation disabled or unknown. |

The `theme` styles and, for circles and squares, the `size` (as `width` and `height`) are applied to every item.
The loading text is rendered last in `<span class="skeleton-loader-text">`, visually hidden.

## Examples

```html
<ngx-skeleton-loader />
<ngx-skeleton-loader count="3" animation="pulse" />
<ngx-skeleton-loader appearance="circle" size="64" ariaLabel="Loading avatar" />
<ngx-skeleton-loader [theme]="{ width: '70%', '--ngx-skeleton-loader-color': '#dbeafe' }" />
<div skeleton-loader count="2"></div>
```

## Computed state

The component exposes read-only signals with the resolved values, useful in tests: `effectiveAppearance`,
`effectiveAnimation` (the animation class or `null`), `effectiveLoadingText`, `effectiveAriaLabel`,
`isCustomContent`, `items` (the rendered item indices), `sizePx`, `classes` and `styles`.
