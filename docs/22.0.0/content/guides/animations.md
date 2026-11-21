---
label: Animations
description: The progress and pulse animations, their dark variants, disabling animations and reduced-motion support.
order: 2
tags: [ "guides", "animation" ]
keywords: [ "progress", "progress-dark", "pulse", "pulse-dark", "shimmer", "prefers-reduced-motion", "duration" ]
icon: animation
---

# Animations

The `animation` input sets the effect of every item. Unknown values render without animation.

| Animation | Effect | Best on |
|-----------|--------|---------|
| `progress` (default) | A light shimmer that sweeps from start to end. | Light backgrounds. |
| `progress-dark` | A darker shimmer. | Dark backgrounds or dark item colors. |
| `pulse` | The item fades in and out. | Any background; the calmest effect. |
| `pulse-dark` | A pulse on a translucent dark item color. | Dark themes. |
| `false` / `'false'` | No animation. | Static states, dense lists, print. |

```html
<ngx-skeleton-loader animation="progress" />
<ngx-skeleton-loader animation="progress-dark" />
<ngx-skeleton-loader animation="pulse" />
<ngx-skeleton-loader animation="pulse-dark" />
```

## Turning animations off

Bind the boolean `false`, or use the string `'false'` when you set a static attribute:

```html
<ngx-skeleton-loader [animation]="false" />
<ngx-skeleton-loader animation="false" />
```

Rendered items get the `no-animation` class in that case.

## Timing and colors

The animations read these CSS variables (see [Theming](theming.md) for the full list):

| Variable | Default | Used by |
|----------|---------|---------|
| `--ngx-skeleton-loader-duration` | `2s` (progress), `1.5s` (pulse) | Every animation. |
| `--ngx-skeleton-loader-highlight` | `rgb(255 255 255 / 60%)` | `progress` shimmer. |
| `--ngx-skeleton-loader-highlight-dark` | `rgb(0 0 0 / 20%)` | `progress-dark` shimmer. |
| `--ngx-skeleton-loader-pulse-dark-color` | `rgb(50 50 50 / 20%)` | `pulse-dark` item background. |

```css
.slow-skeletons {
  --ngx-skeleton-loader-duration: 3s;
}
```

The keyframes are named `ngx-skeleton-loader-progress` and `ngx-skeleton-loader-pulse`, so they do not collide with
`progress` or `pulse` keyframes of your application.

## Reduced motion

When the user enables the operating system "reduce motion" setting, every animation is disabled and the shimmer is
hidden, whatever the `animation` input says. No configuration is needed.

## Setting a default animation

Set the animation once for the whole application with the provider:

```typescript
provideSkeletonLoader({ animation: 'pulse' });
```

See [Configuration](configuration.md).
