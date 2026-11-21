---
label: Quick Start
description: Import SkeletonLoaderComponent, render placeholders while data loads and optionally set application-wide defaults.
order: 2
tags: [ "getting-started", "quick-start" ]
keywords: [ "standalone", "import", "count", "provideSkeletonLoader" ]
icon: bolt
---

# Quick Start

## 1. Import the component

`SkeletonLoaderComponent` is standalone: add it to the `imports` of the component that shows the placeholder.

```typescript
import { Component } from '@angular/core';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

@Component({
  selector: 'app-article',
  imports: [SkeletonLoaderComponent],
  template: `<ngx-skeleton-loader count="3" />`,
})
export class Article {}
```

The same component also matches the `<skeleton-loader>` element and the `[skeleton-loader]` attribute.

## 2. Show it while data loads

Render the skeleton in place of the content until the data is available:

```typescript
import { Component, signal } from '@angular/core';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

@Component({
  selector: 'app-profile',
  imports: [SkeletonLoaderComponent],
  template: `
    @if (user(); as user) {
      <h2>{{ user.name }}</h2>
      <p>{{ user.bio }}</p>
    } @else {
      <ngx-skeleton-loader appearance="circle" size="48" ariaLabel="Loading profile" />
      <ngx-skeleton-loader count="2" />
    }
  `,
})
export class Profile {
  readonly user = signal<{ name: string; bio: string } | null>(null);
}
```

## 3. Optional: set defaults once

`provideSkeletonLoader()` sets defaults for every skeleton loader of the application. Inputs still win over them.

```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideSkeletonLoader } from '@fsegurai/ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideSkeletonLoader({ animation: 'pulse', loadingText: 'Loading content...' }),
  ],
};
```

## Where to go next

- [Appearances](../guides/appearances.md) and [Animations](../guides/animations.md) for the visual options.
- [Theming](../guides/theming.md) for colors and sizes.
- [Loading States](../guides/dynamic-content.md) for `@if`, `@defer` and custom layouts.
