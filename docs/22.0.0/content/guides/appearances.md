---
label: Appearances
description: Line, circle, square and custom-content placeholders, the count input and sizing of shapes.
order: 1
tags: [ "guides", "appearance" ]
keywords: [ "line", "circle", "square", "custom-content", "count", "size", "avatar" ]
icon: category
---

# Appearances

The `appearance` input sets the shape of every item. Unknown values fall back to `'line'`.

| Appearance | Renders | Typical use |
|------------|---------|-------------|
| `line` (default) | A full-width bar, `20px` high. | Text, paragraphs, list rows. |
| `circle` | A `40px` circle. | Avatars, icons, round buttons. |
| `square` | A `40px` square. | Thumbnails, cards, grid tiles. |
| `custom-content` | One transparent container that projects your markup. | Complex or brand-specific layouts. |

## Lines

```html
<ngx-skeleton-loader />
<ngx-skeleton-loader appearance="line" count="4" />
```

Lines take the full width of their container. Make a line shorter with the `theme` input:

```html
<ngx-skeleton-loader count="2" />
<ngx-skeleton-loader [theme]="{ width: '60%' }" />
```

## Circles and squares

```html
<ngx-skeleton-loader appearance="circle" />
<ngx-skeleton-loader appearance="square" count="3" />
```

The `size` input sets the width and height of circles and squares in pixels. It accepts a number, a numeric string
or a numeric string with a `px` suffix:

```html
<ngx-skeleton-loader appearance="circle" size="64" />
<ngx-skeleton-loader appearance="square" [size]="120" />
<ngx-skeleton-loader appearance="square" size="80px" />
```

`size` is ignored by `line` and `custom-content`. Invalid values (negative numbers, `'abc'`, `'10em'`) are ignored
and the default size applies. To size every circle and square at once, set the `--ngx-skeleton-loader-shape-size`
CSS variable instead (see [Theming](theming.md)).

## Count

`count` repeats the item. Values below `1` or that are not a number fall back to `1`; decimals are rounded down.

```html
<ngx-skeleton-loader count="5" />
<ngx-skeleton-loader [count]="rows()" />
```

## Custom content

`custom-content` renders a single transparent container and projects its content, so you can draw any layout. The
container keeps the animation class, so the shimmer runs over your shapes.

```html
<ngx-skeleton-loader appearance="custom-content" ariaLabel="Loading author">
  <div class="author-skeleton">
    <div class="author-skeleton__avatar"></div>
    <div class="author-skeleton__lines">
      <div></div>
      <div></div>
    </div>
  </div>
</ngx-skeleton-loader>
```

```css
.author-skeleton {
  display: flex;
  gap: 12px;
  align-items: center;
}

.author-skeleton__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgb(239 241 246);
}

.author-skeleton__lines {
  flex: 1;
  display: grid;
  gap: 8px;
}

.author-skeleton__lines div {
  height: 12px;
  border-radius: 4px;
  background: rgb(239 241 246);
}
```

`custom-content` always renders one item. A `count` set by `provideSkeletonLoader()` does not apply to it; a `count`
other than `1` bound on the loader itself is forced to `1`, and in development mode the component logs an error to the
console.

## Combining shapes

Compose several loaders to sketch the final layout, for example a list row:

```html
<div class="row">
  <ngx-skeleton-loader appearance="circle" size="40" />
  <div class="row__text">
    <ngx-skeleton-loader [theme]="{ width: '40%' }" />
    <ngx-skeleton-loader [theme]="{ width: '80%' }" />
  </div>
</div>
```

Each `<ngx-skeleton-loader>` is its own status region; when several loaders describe one area, give them a shared
label or wrap the area as described in [Accessibility](accessibility.md).
