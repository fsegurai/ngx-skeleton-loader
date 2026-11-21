---
label: Loading States
description: Swap skeletons and content with @if, @defer and resources, change inputs at runtime and sketch complex layouts with custom-content.
order: 5
tags: [ "guides", "loading-state" ]
keywords: [ "@if", "@defer", "@placeholder", "@loading", "resource", "httpResource", "signals", "custom-content" ]
icon: hourglass_empty
---

# Loading States

A skeleton is only useful while the real content is missing. These patterns render it exactly then.

## With @if and a signal

```typescript
import { Component, signal } from '@angular/core';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-products',
  imports: [SkeletonLoaderComponent],
  template: `
    @if (products(); as products) {
      <ul>
        @for (product of products; track product.id) {
          <li>{{ product.name }}</li>
        }
      </ul>
    } @else {
      <ngx-skeleton-loader count="5" ariaLabel="Loading products" />
    }
  `,
})
export class Products {
  readonly products = signal<Product[] | undefined>(undefined);
}
```

## With a resource

`httpResource()` (or `resource()`) exposes `isLoading()`, `hasValue()` and `value()`:

```typescript
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

@Component({
  selector: 'app-user-card',
  imports: [SkeletonLoaderComponent],
  template: `
    @if (user.hasValue()) {
      <h3>{{ user.value().name }}</h3>
    } @else if (user.isLoading()) {
      <ngx-skeleton-loader appearance="circle" size="56" ariaLabel="Loading user" />
      <ngx-skeleton-loader [theme]="{ width: '50%' }" />
    } @else if (user.error()) {
      <p>Could not load the user.</p>
    }
  `,
})
export class UserCard {
  readonly user = httpResource<{ name: string }>(() => '/api/user');
}
```

## With @defer

Use a skeleton as the `@placeholder` and `@loading` block of a deferred view. The component is tiny, so it does not
need to be deferred itself:

```html
@defer (on viewport) {
  <app-comments />
} @placeholder {
  <ngx-skeleton-loader count="3" ariaLabel="Comments" />
} @loading (minimum 300ms) {
  <ngx-skeleton-loader count="3" ariaLabel="Loading comments" />
}
```

## Changing inputs at runtime

Every input is a signal input, so bindings update the loader without extra work:

```typescript
import { Component, signal } from '@angular/core';
import { SkeletonLoaderAnimation, SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

@Component({
  selector: 'app-live-settings',
  imports: [SkeletonLoaderComponent],
  template: `
    <button type="button" (click)="rows.set(rows() + 1)">Add row</button>
    <button type="button" (click)="animation.set(animation() === 'pulse' ? 'progress' : 'pulse')">
      Switch animation
    </button>
    <ngx-skeleton-loader [count]="rows()" [animation]="animation()" />
  `,
})
export class LiveSettings {
  readonly rows = signal(3);
  readonly animation = signal<SkeletonLoaderAnimation>('pulse');
}
```

## Sketching a complex layout

When lines and shapes are not enough, `custom-content` projects your own markup and keeps one status region for the
whole block:

```html
<ngx-skeleton-loader appearance="custom-content" ariaLabel="Loading article">
  <div class="article-skeleton">
    <div class="article-skeleton__cover"></div>
    <div class="article-skeleton__title"></div>
    <div class="article-skeleton__line"></div>
    <div class="article-skeleton__line"></div>
  </div>
</ngx-skeleton-loader>
```

Style the inner elements with your own CSS (reuse `var(--ngx-skeleton-loader-color)` for their background so they
follow the theme). See [Appearances](appearances.md#custom-content).

## Tips

- Match the size of the skeleton to the final content to avoid layout shifts.
- Prefer one loader with `count` over many single loaders: it is one status announcement instead of several.
- Remove the skeleton as soon as the content arrives; do not keep both in the DOM.
