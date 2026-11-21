<p align="center" class="intro">
  <img alt="NGX Skeleton Loader Logo" src="https://raw.githubusercontent.com/fsegurai/ngx-skeleton-loader/main/demo/public/ngx-skeleton-loader.png">
</p>

<p align="center" class="intro">
  <a href="https://github.com/fsegurai/ngx-skeleton-loader/releases/latest">
      <img src="https://img.shields.io/github/v/release/fsegurai/ngx-skeleton-loader"
          alt="Latest Release">
  </a>
  <br>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/fsegurai/ngx-skeleton-loader">
  <img alt="Dependency status for repo" src="https://img.shields.io/librariesio/github/fsegurai/ngx-skeleton-loader">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="GitHub License" src="https://img.shields.io/github/license/fsegurai/ngx-skeleton-loader">
  </a>
  <br>
  <img alt="Stars" src="https://img.shields.io/github/stars/fsegurai/ngx-skeleton-loader?style=square&labelColor=343b41"/>
  <img alt="Forks" src="https://img.shields.io/github/forks/fsegurai/ngx-skeleton-loader?style=square&labelColor=343b41"/>
  <a href="https://www.npmjs.com/package/@fsegurai/ngx-skeleton-loader">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/@fsegurai/ngx-skeleton-loader">
  </a>
</p>

`@fsegurai/ngx-skeleton-loader` is an [Angular](https://angular.dev/) component that renders lightweight, accessible
placeholders while content loads: lines, circles, squares or your own layout, animated with a shimmer or a pulse and
themed with CSS custom properties.

### Table of contents

- [Features](#features)
- [Installation](#installation)
    - [Compatibility](#compatibility)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [Usage](#usage)
    - [Appearances](#appearances)
    - [Animations](#animations)
    - [Loading states](#loading-states)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [API reference](#api-reference)
- [Migrating from 1.0.0-alpha](#migrating-from-100-alpha)
- [Documentation](#documentation)
- [Demo application](#demo-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Four appearances** — `line`, `circle`, `square` and `custom-content` (project any layout).
- **Animations** — `progress` shimmer and `pulse`, each with a dark variant, or none; disabled automatically under
  `prefers-reduced-motion`.
- **Global defaults** — `provideSkeletonLoader()` at application or route level; nested providers merge over their
  ancestors.
- **Themeable** — nine `--ngx-skeleton-loader-*` CSS variables plus a `theme` input for inline styles.
- **Accessible** — one polite `role="status"` region per loader with a label and visually hidden loading text; the
  shapes are hidden from assistive technologies.
- **Fast with many loaders** — loaders outside the viewport stop animating (one shared `IntersectionObserver`), so a
  list of a thousand placeholders keeps 60 fps.
- **Modern Angular** — standalone, `OnPush`, signal inputs, zoneless-ready, no dependencies besides `tslib`.

## Installation

```bash
npm install @fsegurai/ngx-skeleton-loader
# or
bun add @fsegurai/ngx-skeleton-loader
```

| Peer dependency                    | Version   |
|------------------------------------|-----------|
| `@angular/core`, `@angular/common` | `^22.0.0` |

`zone.js` is not required: the component works with `provideZonelessChangeDetection()` and with zone-based change
detection.

### Compatibility

| Angular | @fsegurai/ngx-skeleton-loader |
|---------|-------------------------------|
| 22      | 22.x                          |

The major version of the library tracks Angular.

## Quick start

Import the standalone component where you need it:

```typescript
import { Component, signal } from '@angular/core';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

@Component({
  selector: 'app-profile',
  imports: [SkeletonLoaderComponent],
  template: `
    @if (user(); as user) {
      <h2>{{ user.name }}</h2>
    } @else {
      <ngx-skeleton-loader appearance="circle" size="48" ariaLabel="Loading profile" />
      <ngx-skeleton-loader count="2" />
    }
  `,
})
export class Profile {
  readonly user = signal<{ name: string } | null>(null);
}
```

The component matches `<ngx-skeleton-loader>`, `<skeleton-loader>` and the `[skeleton-loader]` attribute.

## Configuration

`provideSkeletonLoader()` is optional. It sets defaults for every loader; inputs still win.

```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideSkeletonLoader } from '@fsegurai/ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideSkeletonLoader({
      animation: 'pulse',
      loadingText: 'Loading content...',
      theme: { extendsFromRoot: true, 'border-radius': '6px' },
    }),
  ],
};
```

| Option        | Type                                                                            | Built-in default |
|---------------|---------------------------------------------------------------------------------|------------------|
| `appearance`  | `'line' \| 'circle' \| 'square' \| 'custom-content'`                            | `'line'`         |
| `animation`   | `'progress' \| 'progress-dark' \| 'pulse' \| 'pulse-dark' \| false \| 'false'` | `'progress'`     |
| `count`       | `number`                                                                        | `1`              |
| `loadingText` | `string`                                                                        | `'Loading...'`   |
| `ariaLabel`   | `string`                                                                        | `'loading'`      |
| `size`        | `number \| '${number}' \| '${number}px' \| null`                                | none             |
| `theme`       | `SkeletonLoaderTheme \| null`                                                   | none             |

Precedence, lowest first: built-in defaults (`SKELETON_LOADER_DEFAULTS`), providers (a nested
`provideSkeletonLoader()` in route `providers` merges over the application one), instance inputs. An `undefined`
value never overrides.

```typescript
export const routes: Routes = [
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports').then((m) => m.Reports),
    providers: [provideSkeletonLoader({ animation: 'progress-dark' })],
  },
];
```

## Usage

### Appearances

```html
<ngx-skeleton-loader count="3" />                                <!-- lines (default) -->
<ngx-skeleton-loader appearance="circle" size="56" />            <!-- avatar -->
<ngx-skeleton-loader appearance="square" [size]="120" count="4" /> <!-- thumbnails -->
<ngx-skeleton-loader [theme]="{ width: '60%' }" />               <!-- shorter line -->
```

`size` sets the width and height of circles and squares in pixels (`64`, `'64'` or `'64px'`); invalid values are
ignored. `count` values below `1` fall back to `1`.

`custom-content` renders a single transparent item that projects your markup (any `count` is forced to `1`):

```html
<ngx-skeleton-loader appearance="custom-content" ariaLabel="Loading author">
  <div class="author-skeleton">
    <div class="author-skeleton__avatar"></div>
    <div class="author-skeleton__line"></div>
  </div>
</ngx-skeleton-loader>
```

### Animations

| Animation            | Effect                                 |
|----------------------|----------------------------------------|
| `progress` (default) | Light shimmer sweeping across the item |
| `progress-dark`      | Darker shimmer                         |
| `pulse`              | Fades in and out                       |
| `pulse-dark`         | Pulse on a translucent dark color      |
| `false` / `'false'`  | No animation                           |

```html
<ngx-skeleton-loader animation="pulse" />
<ngx-skeleton-loader [animation]="false" />
```

Every animation is disabled when the user prefers reduced motion.

### Loading states

```html
@defer (on viewport) {
  <app-comments />
} @placeholder {
  <ngx-skeleton-loader count="3" ariaLabel="Comments" />
}
```

All inputs are signal inputs: bind them to signals and the loader updates on change.

## Theming

Set these CSS custom properties on any ancestor (or `:root`), or per loader through the `theme` input:

| Variable                                 | Default                         | Description                    |
|------------------------------------------|---------------------------------|--------------------------------|
| `--ngx-skeleton-loader-color`            | `rgb(239 241 246)`              | Item background                |
| `--ngx-skeleton-loader-highlight`        | `rgb(255 255 255 / 60%)`        | `progress` shimmer color       |
| `--ngx-skeleton-loader-highlight-dark`   | `rgb(0 0 0 / 20%)`              | `progress-dark` shimmer color  |
| `--ngx-skeleton-loader-pulse-dark-color` | `rgb(50 50 50 / 20%)`           | `pulse-dark` item background   |
| `--ngx-skeleton-loader-height`           | `20px`                          | Line height                    |
| `--ngx-skeleton-loader-radius`           | `4px`                           | Line corner radius             |
| `--ngx-skeleton-loader-shape-size`       | `40px`                          | Circle and square size         |
| `--ngx-skeleton-loader-gap`              | `10px`                          | Space below each item          |
| `--ngx-skeleton-loader-duration`         | `2s` (progress), `1.5s` (pulse) | Animation duration             |

```css
[data-theme='dark'] {
  --ngx-skeleton-loader-color: #2a2f3a;
  --ngx-skeleton-loader-highlight: rgb(255 255 255 / 8%);
}
```

```html
<ngx-skeleton-loader [theme]="{ width: '80%', '--ngx-skeleton-loader-color': '#dbeafe' }" />
```

An instance `theme` replaces the provider `theme`, unless the provider theme sets `extendsFromRoot: true`: then the
instance theme is merged over it.

## Accessibility

| Area         | Behavior                                                                                  |
|--------------|-------------------------------------------------------------------------------------------|
| Region       | The host is one `role="status"`, `aria-live="polite"`, `aria-busy="true"` region per loader |
| Name         | `aria-label` from `ariaLabel` (default `'loading'`)                                       |
| Announcement | `loadingText` (default `'Loading...'`) in a visually hidden element                       |
| Shapes       | Items are `aria-hidden="true"` and never focusable                                        |
| Motion       | Animations stop under `prefers-reduced-motion: reduce`                                    |

Give each loader a descriptive `ariaLabel` and `loadingText`, and prefer one loader per area (use `count` or
`custom-content`) so the area is announced once. When many loaders must stay separate (a placeholder per list row),
wrap them in one labelled `role="status"` region and set `announce="false"` on each loader: they become decorative
(`aria-hidden`) and the wrapper is announced once.

## API reference

### `<ngx-skeleton-loader>` (`SkeletonLoaderComponent`)

| Input         | Type                          | Default        |
|---------------|-------------------------------|----------------|
| `count`       | `number`                      | `1`            |
| `appearance`  | `SkeletonLoaderAppearance`    | `'line'`       |
| `animation`   | `SkeletonLoaderAnimation`     | `'progress'`   |
| `size`        | `SkeletonLoaderSize \| null`  | none           |
| `theme`       | `SkeletonLoaderTheme \| null` | none           |
| `ariaLabel`   | `string`                      | `'loading'`    |
| `loadingText` | `string`                      | `'Loading...'` |

### Configuration exports

| Export                                    | Description                                                                   |
|-------------------------------------------|-------------------------------------------------------------------------------|
| `provideSkeletonLoader(config?)`          | `EnvironmentProviders` with defaults merged over the parent configuration     |
| `SKELETON_LOADER_CONFIG`                  | Injection token of the merged provider defaults (root factory returns `{}`)   |
| `SKELETON_LOADER_DEFAULTS`                | The built-in defaults                                                         |
| `mergeSkeletonLoaderConfig(base, over)`   | Merges `over` over `base`, ignoring `undefined` values                        |
| `SkeletonLoaderConfig`, `SkeletonLoaderAppearance`, `SkeletonLoaderAnimation`, `SkeletonLoaderSize`, `SkeletonLoaderTheme` | Types |

## Migrating from 1.0.0-alpha

22.0.0 replaces the unreleased `1.0.0-alpha.0` preview:

- `SkeletonLoaderModule` and `forRoot()` are removed: import `SkeletonLoaderComponent` and use
  `provideSkeletonLoader()`.
- `provideNgxSkeletonLoader()` is renamed to `provideSkeletonLoader()`.
- Items no longer carry `role="progressbar"`, `tabindex` and `aria-value*`; the host is one `role="status"` region.
- `size` applies to circles too; invalid sizes are ignored instead of producing `0px`.
- `custom-content` forces `count` to `1` in production as well.
- Keyframes are renamed `ngx-skeleton-loader-progress` / `ngx-skeleton-loader-pulse`.
- `zone.js`, `rxjs` and `@angular/platform-browser` are no longer peers.

See the [migration guide](docs/22.0.0/content/migration/alpha-to-22.md) for before/after examples.

## Documentation

Versioned documentation lives in [`docs/22.0.0/content`](docs/22.0.0/content/README.md), with a `manifest.json` and
`search-index.json` generated by [`@fsegurai/manifest-generator`](https://github.com/fsegurai/manifest-generator) and
live playground samples in `docs/22.0.0/playground`.

## Demo application

```bash
git clone https://github.com/fsegurai/ngx-skeleton-loader.git
cd ngx-skeleton-loader
bun install
bun start            # library watch build + demo at http://localhost:4200
```

## Contributing

Contributions are welcome. Read the [contributing guide](CONTRIBUTING.md) for setup, tests (Vitest), linting (Biome)
and the commit convention.

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
