---
label: Installation
description: Install @fsegurai/ngx-skeleton-loader in an Angular 22 application; no other peer dependencies are required.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "bun", "peer dependencies", "zoneless" ]
icon: download
---

# Installation

Install the library with your package manager:

```bash
npm install @fsegurai/ngx-skeleton-loader
# or
bun add @fsegurai/ngx-skeleton-loader
```

## Peer dependencies

The package only expects the Angular packages every application already has:

| Package | Version | Why |
|---------|---------|-----|
| `@angular/core` | `^22.0.0` | The component, signals and the provider. |
| `@angular/common` | `^22.0.0` | Template support. |

`tslib` is installed as a regular dependency. `zone.js` is **not** required: the component is `OnPush`, reads its
inputs through signals and works with `provideZonelessChangeDetection()` (the Angular 22 default) as well as with
zone-based change detection.

## Compatibility

| Angular | @fsegurai/ngx-skeleton-loader |
|---------|-------------------------------|
| 22      | 22.x                          |

## Next step

Render your first placeholder in the [Quick Start](quick-start.md).
