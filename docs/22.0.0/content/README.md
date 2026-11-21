---
label: Documentation Home
description: Documentation for @fsegurai/ngx-skeleton-loader 22.0.0, an accessible, themeable skeleton placeholder component for Angular.
order: 0
tags: [ "documentation", "overview", "angular" ]
keywords: [ "skeleton", "loader", "placeholder", "loading state" ]
icon: home
breadcrumbTitle: Home
---

# @fsegurai/ngx-skeleton-loader Docs

`@fsegurai/ngx-skeleton-loader` renders lightweight placeholders that keep the layout stable while content loads.
It is a single standalone component, `<ngx-skeleton-loader>`, configured through inputs, an optional
`provideSkeletonLoader()` provider and CSS custom properties.

| Building block | What it is |
|----------------|------------|
| `SkeletonLoaderComponent` | `<ngx-skeleton-loader>`: one or more placeholder items inside a polite `role="status"` region. |
| `provideSkeletonLoader()` | Application-wide or route-level defaults for every skeleton loader. |
| `SKELETON_LOADER_CONFIG` | The injection token that holds the merged provider defaults. |
| CSS custom properties | `--ngx-skeleton-loader-*` variables for colors, sizes, spacing and animation timing. |

## Quick path

1. [Install](getting-started/installation.md) the package.
2. Follow the [Quick Start](getting-started/quick-start.md) to render a first placeholder.
3. Pick an [appearance](guides/appearances.md) and an [animation](guides/animations.md), then
   [theme](guides/theming.md) it to match your design.

## Sections

- **Getting Started**: installation and a first placeholder.
- **Guides**: appearances, animations, theming, global configuration, loading states and accessibility.
- **API Reference**: the component inputs and the provider, token and types.
- **Migration**: moving from the unreleased `1.0.0-alpha.0` to 22.x.
- **Release Notes**: [what's new in 22.0.0](release-notes/whats-new.md).

## Version

These pages document **22.0.0**. The major version of the library tracks Angular: 22.x requires Angular 22.
