---
label: Performance
description: What many loaders cost, how offscreen loaders stop animating, and how to keep large lists fast.
order: 7
tags: [ "guides", "performance" ]
keywords: [ "performance", "fps", "many skeletons", "list", "table", "IntersectionObserver", "offscreen", "content-visibility" ]
icon: speed
---

# Performance

## Many loaders on one page

Every animated skeleton costs style and compositing work on every frame, whether it is visible or not. A page that
renders a placeholder for each row of a long list or table can therefore drop frames even though only a few rows are on
screen.

The component handles this for you: one `IntersectionObserver`, shared by every loader of the application, flags the
loaders outside the viewport and their animations stop. The flag is the `data-skeleton-offscreen` attribute on the
host, set directly on the element, so no change detection runs when you scroll. Loaders start animating again 200px
before they scroll into view.

Measured in Chromium with 4× CPU throttling, 3 lines per loader:

| Loaders | Animation | Before | With offscreen pausing |
|---------|-----------|--------|------------------------|
| 300 | `progress` | 18 fps | 60 fps |
| 1000 | `progress` | 6 fps | 59 fps |
| 1000 | `pulse` | 12 fps | 60 fps |

Nothing needs to be configured. Without `IntersectionObserver` (server rendering, very old browsers) every loader
animates, as before.

## Rendering cost

Creating a loader is cheap and updating it is cheaper: the component is `OnPush` with signal inputs, so loaders whose
inputs do not change cost nothing on later change detection runs. A few tips still help with very large lists:

- **Prefer `count` over many loaders.** `<ngx-skeleton-loader count="5" />` creates one component and one status
  region; five separate loaders create five of each.
- **Render only what fits.** A placeholder list does not need as many rows as the real data: a screenful is enough.
- **Virtualize long lists.** With `@angular/cdk/scrolling` only the visible rows (and their loaders) exist.
- **Skip offscreen layout.** `content-visibility: auto` on your row containers lets the browser skip layout and paint
  of rows outside the viewport:

```css
.row {
  content-visibility: auto;
  contain-intrinsic-size: auto 120px;
}
```

- **Turn animations off when they add nothing.** `animation="false"` (or `provideSkeletonLoader({ animation: false })`)
  removes the animation work entirely, and users who ask for reduced motion never get it.
