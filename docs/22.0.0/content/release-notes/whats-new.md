---
label: What's New in 22.0.0
description: The highlights of 22.0.0, the first release on the Angular-aligned version scheme, with a standalone component, provideSkeletonLoader, an accessible status region and CSS variable theming.
order: 1
tags: [ "release-notes", "22.0.0" ]
keywords: [ "what's new", "angular 22", "standalone", "provideSkeletonLoader", "css variables", "accessibility", "zoneless" ]
icon: auto_awesome
---

# What's New in 22.0.0

> **⚠️ Upgrade notes.** 22.0.0 replaces the unreleased `1.0.0-alpha.0` preview: the NgModule is gone and the
> accessibility markup changed. Read [From 1.0.0-alpha to 22.0](../migration/alpha-to-22.md) before upgrading.

## Angular 22, standalone and zoneless

The major version now tracks Angular. The component is standalone, `OnPush`, built on signal inputs and works with
`provideZonelessChangeDetection()`; the only peers are `@angular/core` and `@angular/common`.

```typescript
@Component({
  imports: [SkeletonLoaderComponent],
  template: `<ngx-skeleton-loader count="3" />`,
})
export class Article {}
```

## provideSkeletonLoader

Defaults for every loader, at application or route level; nested providers merge over their ancestors and
`undefined` never overrides.

```typescript
provideSkeletonLoader({ animation: 'pulse', loadingText: 'Loading content...' });
```

See [Configuration](../guides/configuration.md).

## One accessible status region

Each loader is a single polite `role="status"` region with `aria-busy` and a label, the loading text is visually
hidden, and the items are `aria-hidden`. Screen readers announce the loader once, whatever the `count`. See
[Accessibility](../guides/accessibility.md).

## Theming with CSS variables

Colors, line height and radius, shape size, gap and animation duration are `--ngx-skeleton-loader-*` custom
properties, so a dark theme is a few variables on an ancestor:

```css
[data-theme='dark'] {
  --ngx-skeleton-loader-color: #2a2f3a;
  --ngx-skeleton-loader-highlight: rgb(255 255 255 / 8%);
}
```

See [Theming](../guides/theming.md).

## Smaller fixes

- `size` sizes circles as well as squares; invalid sizes are ignored instead of producing `0px`.
- `custom-content` always renders a single item.
- Animations stop under `prefers-reduced-motion`; keyframes have library-specific names.

## Documentation and playground

Versioned docs, a manifest and a search index generated with `@fsegurai/manifest-generator`, and live playground
samples you can edit in the browser.
