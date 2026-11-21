---
label: From 1.0.0-alpha to 22.0
description: Breaking changes when upgrading @fsegurai/ngx-skeleton-loader from the unreleased 1.0.0-alpha.0 to 22.0.0.
order: 1
tags: [ "migration" ]
keywords: [ "angular 22", "breaking changes", "upgrade", "SkeletonLoaderModule", "forRoot", "provideNgxSkeletonLoader", "progressbar" ]
icon: swap_horiz
---

# From 1.0.0-alpha to 22.0

22.0.0 is the first release on the new version scheme: the major version tracks Angular. It replaces the unreleased
`1.0.0-alpha.0` preview.

## Requirements

- Angular 22: `@angular/core` and `@angular/common` `^22.0.0`.
- `@angular/platform-browser`, `rxjs` and `zone.js` are no longer peers of the library. Zoneless applications are
  supported.

## Breaking changes

| Before (1.0.0-alpha.0) | Now (22.0.0) |
|------------------------|--------------|
| `SkeletonLoaderModule` and `SkeletonLoaderModule.forRoot(config)`. | Removed. Import `SkeletonLoaderComponent` (standalone) and set defaults with `provideSkeletonLoader(config)`. |
| `provideNgxSkeletonLoader(config)`. | Renamed to `provideSkeletonLoader(config)`; nested providers merge over their ancestors. |
| Every item had `role="progressbar"`, `tabindex="-1"`, `aria-valuemin/max/text` and its own `aria-label`. | The host is one polite `role="status"` region with `aria-busy` and `aria-label`; items are `aria-hidden`; `loadingText` is visually hidden text. |
| `size` applied to `square` only. | `size` applies to `square` and `circle`. |
| Invalid numeric size strings (`'abc'`) produced `0px`. | Invalid sizes are ignored and the default size applies. |
| `custom-content` forced `count` to `1` only in development mode. | `count` is forced to `1` in every mode; development mode logs the error only for a `count` bound on the loader (a provider `count` does not apply to `custom-content`). |
| Keyframes were named `progress` and `pulse`. | They are named `ngx-skeleton-loader-progress` and `ngx-skeleton-loader-pulse`. |
| Items were `<div>` elements. | Items are `<span class="skeleton-loader">` elements (`display: inline-block`). |

## Step by step

### 1. Replace the module

```typescript
// Before
@NgModule({
  imports: [SkeletonLoaderModule.forRoot({ animation: 'pulse' })],
})
export class AppModule {}
```

```typescript
// After
import { ApplicationConfig } from '@angular/core';
import { provideSkeletonLoader } from '@fsegurai/ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [provideSkeletonLoader({ animation: 'pulse' })],
};
```

In each component that renders the loader, import the component itself:

```typescript
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

@Component({
  imports: [SkeletonLoaderComponent],
  // ...
})
export class Feature {}
```

### 2. Rename the provider

```diff
- providers: [provideNgxSkeletonLoader({ count: 3 })],
+ providers: [provideSkeletonLoader({ count: 3 })],
```

### 3. Update tests and styles that targeted the old markup

- Queries for `[role="progressbar"]` should target the host `[role="status"]` (one per loader) or
  `.skeleton-loader` items.
- Assertions on `aria-valuetext` should read the `.skeleton-loader-text` element.
- CSS that used the `progress` or `pulse` keyframes from the library should use the new names, or better, the
  `--ngx-skeleton-loader-*` [CSS variables](../guides/theming.md).
- Selectors written as `div.skeleton-loader` should become `.skeleton-loader`.

### 4. Check circle sizes

A `size` set on a `circle` loader used to be ignored; it now sets the circle width and height. Remove it if the
circle should keep the default `40px`.

## New features

- Route-level defaults: `provideSkeletonLoader()` in route `providers` merges over the application defaults.
- CSS custom properties: `--ngx-skeleton-loader-color`, `-highlight`, `-highlight-dark`, `-pulse-dark-color`,
  `-height`, `-radius`, `-shape-size`, `-gap` and `-duration`.
- `prefers-reduced-motion` disables every animation.
- `SKELETON_LOADER_DEFAULTS` and `mergeSkeletonLoaderConfig()` are exported.
