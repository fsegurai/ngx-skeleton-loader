---
label: Configuration
description: Application-wide and route-level defaults with provideSkeletonLoader, the precedence rules and component-level overrides.
order: 4
tags: [ "guides", "configuration" ]
keywords: [ "provideSkeletonLoader", "SKELETON_LOADER_CONFIG", "defaults", "precedence", "route providers", "mergeSkeletonLoaderConfig" ]
icon: tune
---

# Configuration

Every input of `<ngx-skeleton-loader>` can be given a default with `provideSkeletonLoader()`. The provider is
optional: without it the built-in defaults apply.

## Application-wide defaults

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideSkeletonLoader } from '@fsegurai/ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSkeletonLoader({
      animation: 'pulse',
      loadingText: 'Loading content...',
      ariaLabel: 'Content placeholder',
      theme: { extendsFromRoot: true, 'border-radius': '6px' },
    }),
  ],
};
```

| Option | Type | Built-in default |
|--------|------|------------------|
| `appearance` | `'line' \| 'circle' \| 'square' \| 'custom-content'` | `'line'` |
| `animation` | `'progress' \| 'progress-dark' \| 'pulse' \| 'pulse-dark' \| false \| 'false'` | `'progress'` |
| `count` | `number` | `1` |
| `loadingText` | `string` | `'Loading...'` |
| `ariaLabel` | `string` | `'loading'` |
| `announce` | `boolean` | `true` |
| `size` | `number \| '${number}' \| '${number}px' \| null` | none |
| `theme` | `SkeletonLoaderTheme \| null` | none |

The built-in defaults are exported as `SKELETON_LOADER_DEFAULTS`.

## Precedence

Lowest first:

1. The built-in defaults (`SKELETON_LOADER_DEFAULTS`).
2. The providers: a nested `provideSkeletonLoader()` merges its options over those of its ancestors.
3. The instance inputs.

An `undefined` value never overrides: `provideSkeletonLoader({ animation: undefined })` keeps the inherited
animation, and an unbound input keeps the provider value. `null` is a value: `[theme]="null"` removes the provider
theme (unless it sets `extendsFromRoot`, see [Theming](theming.md)).

## Route-level defaults

`provideSkeletonLoader()` returns `EnvironmentProviders`, so it also works in the `providers` of a route. Its options
are merged over the application options for every component rendered under that route:

```typescript
import { Routes } from '@angular/router';
import { provideSkeletonLoader } from '@fsegurai/ngx-skeleton-loader';

export const routes: Routes = [
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports').then((m) => m.Reports),
    // Inherits loadingText and theme from the application, changes the animation only.
    providers: [provideSkeletonLoader({ animation: 'progress-dark' })],
  },
];
```

## Component-level defaults

Component `providers` do not accept `EnvironmentProviders`. To scope defaults to one component subtree, provide the
`SKELETON_LOADER_CONFIG` token yourself and merge with the inherited value using `mergeSkeletonLoaderConfig()`:

```typescript
import { Component, inject } from '@angular/core';
import {
  mergeSkeletonLoaderConfig,
  SKELETON_LOADER_CONFIG,
  SkeletonLoaderComponent,
} from '@fsegurai/ngx-skeleton-loader';

@Component({
  selector: 'app-gallery',
  imports: [SkeletonLoaderComponent],
  providers: [
    {
      provide: SKELETON_LOADER_CONFIG,
      useFactory: () =>
        mergeSkeletonLoaderConfig(inject(SKELETON_LOADER_CONFIG, { skipSelf: true }), {
          appearance: 'square',
          size: 120,
        }),
    },
  ],
  template: `<ngx-skeleton-loader count="6" />`,
})
export class Gallery {}
```

## Reading the configuration

`SKELETON_LOADER_CONFIG` is provided in root (an empty object when no provider is used), so it can always be
injected, for example to reuse the configured loading text elsewhere:

```typescript
const config = inject(SKELETON_LOADER_CONFIG);
const text = config.loadingText ?? SKELETON_LOADER_DEFAULTS.loadingText;
```
