// The playground has no build step: Angular compiles the templates in the browser (JIT),
// so the compiler must be loaded before anything else.
import '@angular/compiler';
import { Component, computed, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideSkeletonLoader, SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

const App = Component({
  selector: 'app-root',
  imports: [SkeletonLoaderComponent],
  template: `
    <main>
      <h1>Theming</h1>

      <fieldset>
        <legend>Palette</legend>
        @for (option of palettes; track option) {
          <label>
            <input type="radio" name="palette" [checked]="palette() === option" (change)="palette.set(option)" />
            {{ option }}
          </label>
        }
      </fieldset>

      <fieldset>
        <legend>CSS variables</legend>
        <label>
          --ngx-skeleton-loader-height
          <input type="range" min="8" max="40" [value]="height()" (input)="height.set($any($event.target).valueAsNumber)" />
          {{ height() }}px
        </label>
        <label>
          --ngx-skeleton-loader-radius
          <input type="range" min="0" max="20" [value]="radius()" (input)="radius.set($any($event.target).valueAsNumber)" />
          {{ radius() }}px
        </label>
        <label>
          --ngx-skeleton-loader-duration
          <input type="range" min="0.5" max="5" step="0.5" [value]="duration()" (input)="duration.set($any($event.target).valueAsNumber)" />
          {{ duration() }}s
        </label>
      </fieldset>

      <!-- CSS variables cascade: set them on any ancestor and every loader inside follows. -->
      <section [class]="palette()" [style]="variables()">
        <h2>Lines</h2>
        <ngx-skeleton-loader count="3" />

        <h2>Shapes</h2>
        <ngx-skeleton-loader appearance="circle" count="4" size="48" />

        <h2>theme input, merged over the provider theme (extendsFromRoot)</h2>
        <!-- The provider theme sets the margin; these instance themes only add a width. -->
        <ngx-skeleton-loader [theme]="{ width: '90%' }" />
        <ngx-skeleton-loader [theme]="{ width: '60%' }" />
        <ngx-skeleton-loader [theme]="{ width: '30%', '--ngx-skeleton-loader-color': 'var(--pg-primary)' }" />
      </section>
    </main>
  `,
})(
  class {
    palettes = ['preview', 'library-default', 'sunset'];
    palette = signal('preview');
    height = signal(16);
    radius = signal(8);
    duration = signal(2);
    variables = computed(() => ({
      '--ngx-skeleton-loader-height': `${this.height()}px`,
      '--ngx-skeleton-loader-radius': `${this.radius()}px`,
      '--ngx-skeleton-loader-duration': `${this.duration()}s`,
    }));
  },
);

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    // A theme for every loader. extendsFromRoot: instance themes are merged over it instead of replacing it.
    provideSkeletonLoader({ theme: { extendsFromRoot: true, 'margin-block-end': '12px' } }),
  ],
}).then(() => console.log('ngx-skeleton-loader theming ready'));
