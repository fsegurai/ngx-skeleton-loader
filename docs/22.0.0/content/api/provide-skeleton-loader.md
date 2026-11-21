---
label: provideSkeletonLoader
description: provideSkeletonLoader, the SKELETON_LOADER_CONFIG token, SKELETON_LOADER_DEFAULTS, mergeSkeletonLoaderConfig and the exported types.
order: 2
tags: [ "api", "providers" ]
keywords: [ "provideSkeletonLoader", "SKELETON_LOADER_CONFIG", "SKELETON_LOADER_DEFAULTS", "mergeSkeletonLoaderConfig", "SkeletonLoaderConfig", "SkeletonLoaderTheme" ]
icon: extension
---

# provideSkeletonLoader

## provideSkeletonLoader(config?)

```typescript
function provideSkeletonLoader(config?: SkeletonLoaderConfig): EnvironmentProviders;
```

Provides `SKELETON_LOADER_CONFIG` as the parent configuration merged with `config` (`undefined` values are ignored).
Use it in `bootstrapApplication`/`ApplicationConfig` providers or in route `providers`; nested calls merge over
their ancestors.

```typescript
bootstrapApplication(App, {
  providers: [provideSkeletonLoader({ animation: 'pulse', theme: { height: '1rem' } })],
});
```

## SkeletonLoaderConfig

```typescript
interface SkeletonLoaderConfig {
  readonly appearance?: SkeletonLoaderAppearance;
  readonly animation?: SkeletonLoaderAnimation;
  readonly count?: number;
  readonly loadingText?: string;
  readonly ariaLabel?: string;
  readonly announce?: boolean;
  readonly size?: SkeletonLoaderSize | null;
  readonly theme?: SkeletonLoaderTheme | null;
}
```

Each option is the default of the input with the same name. See
[SkeletonLoaderComponent](skeleton-loader-component.md#inputs).

## SKELETON_LOADER_CONFIG

```typescript
const SKELETON_LOADER_CONFIG: InjectionToken<SkeletonLoaderConfig>;
```

Provided in root with a factory that returns `{}`, so the component works without any provider.
`provideSkeletonLoader()` replaces it with the merged configuration.

## SKELETON_LOADER_DEFAULTS

```typescript
const SKELETON_LOADER_DEFAULTS: {
  readonly appearance: 'line';
  readonly animation: 'progress';
  readonly count: 1;
  readonly loadingText: 'Loading...';
  readonly ariaLabel: 'loading';
  readonly announce: true;
};
```

The built-in defaults, used when neither an input nor a provider sets a value.

## mergeSkeletonLoaderConfig(base, override)

```typescript
function mergeSkeletonLoaderConfig(base: SkeletonLoaderConfig, override: SkeletonLoaderConfig): SkeletonLoaderConfig;
```

Returns `override` merged over `base`, ignoring the `undefined` values of `override`. It is the merge used by
`provideSkeletonLoader()`; use it to build component-level configurations (see
[Configuration](../guides/configuration.md#component-level-defaults)).

```typescript
mergeSkeletonLoaderConfig({ animation: 'pulse', count: 2 }, { animation: undefined, count: 4 });
// { animation: 'pulse', count: 4 }
```

## Types

```typescript
type SkeletonLoaderAppearance = 'line' | 'circle' | 'square' | 'custom-content';

type SkeletonLoaderAnimation = 'progress' | 'progress-dark' | 'pulse' | 'pulse-dark' | false | 'false';

type SkeletonLoaderSize = number | `${number}` | `${number}px`;

type SkeletonLoaderTheme = {
  readonly extendsFromRoot?: boolean;
} & Readonly<Record<string, string | number | boolean | null | undefined>>;
```

`SkeletonLoaderTheme` holds the same values as a `[style]` binding, CSS custom properties included.
`extendsFromRoot` is only meaningful in the provider theme: when `true`, an instance `theme` is merged over it
instead of replacing it.
