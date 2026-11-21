---
label: Accessibility
description: The polite status region, hidden loading text, labels for each loader, reduced motion and announcing completion.
order: 6
tags: [ "guides", "accessibility" ]
keywords: [ "aria", "role status", "aria-live", "aria-busy", "screen reader", "prefers-reduced-motion", "a11y" ]
icon: accessibility_new
---

# Accessibility

## What the component renders

```html
<ngx-skeleton-loader
  class="ngx-skeleton-loader"
  role="status"
  aria-live="polite"
  aria-busy="true"
  aria-label="loading"
>
  <span class="skeleton-loader progress" aria-hidden="true"></span>
  <span class="skeleton-loader progress" aria-hidden="true"></span>
  <span class="skeleton-loader-text">Loading...</span>
</ngx-skeleton-loader>
```

| Part | Behavior |
|------|----------|
| Host | One polite `role="status"` live region per loader, marked `aria-busy="true"`, named by `ariaLabel`. |
| Items | `aria-hidden="true"`: decorative shapes are never announced, whatever the `count`. |
| Loading text | `loadingText` in a visually hidden element, read by screen readers. |
| Focus | Nothing is focusable: no `tabindex`, no interactive roles. |
| Motion | Animations stop when the user prefers reduced motion. |

## Labeling each loader

Describe what is loading instead of keeping the generic defaults:

```html
<section aria-labelledby="products-heading">
  <h2 id="products-heading">Featured products</h2>
  <ngx-skeleton-loader count="4" ariaLabel="Featured products" loadingText="Loading featured products" />
</section>
```

Set application-wide wording, or translations, with the provider:

```typescript
provideSkeletonLoader({ ariaLabel: 'Cargando', loadingText: 'Cargando contenido...' });
```

## Several loaders in one area

Every loader is its own status region. When an area combines several loaders (an avatar circle plus text lines),
prefer a single `custom-content` loader, or a single loader with `count`, so the area is announced once.

When the loaders must stay separate (a list or a table with a placeholder per row), wrap them in one region you
label yourself and set `announce` to `false` on each loader. The loaders become decorative (`aria-hidden="true"`, no
status role, no hidden text) and screen readers announce the wrapper once instead of every row:

```html
<div role="status" aria-live="polite" aria-busy="true" aria-label="Loading orders">
  @for (row of placeholderRows; track row) {
    <ngx-skeleton-loader announce="false" count="2" />
  }
  <span class="visually-hidden">Loading orders...</span>
</div>
```

To make every loader of a page or route decorative, use `provideSkeletonLoader({ announce: false })` and keep one
labelled region per area.

## Announcing completion

When the content replaces the loader, the status region leaves the DOM. If the change matters to the user (search
results, a refreshed list), announce it, for example with the CDK `LiveAnnouncer`, or move focus to the new heading:

```typescript
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { inject } from '@angular/core';

export class Results {
  readonly #announcer = inject(LiveAnnouncer);

  onLoaded(count: number): void {
    this.#announcer.announce(`${count} results loaded`);
  }
}
```

`@angular/cdk` is not a dependency of this library; use it only if your application already has it.

## Reduced motion

The stylesheet disables every animation, and hides the shimmer, under `@media (prefers-reduced-motion: reduce)`. To
remove motion for everyone, set `animation: false` in the provider.

## Checklist

- Give each loader a descriptive `ariaLabel` and `loadingText`.
- Keep one loader per area.
- Match the final layout to avoid layout shifts.
- Remove the loader as soon as the content is ready.
- Test with a screen reader (NVDA, JAWS, VoiceOver or TalkBack).
