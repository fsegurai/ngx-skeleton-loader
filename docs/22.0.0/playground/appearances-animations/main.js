// The playground has no build step: Angular compiles the templates in the browser (JIT),
// so the compiler must be loaded before anything else.
import '@angular/compiler';
import { Component, effect, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

const App = Component({
  selector: 'app-root',
  imports: [SkeletonLoaderComponent],
  template: `
    <main>
      <h1>Appearances and animations</h1>

      <fieldset>
        <legend>Appearance</legend>
        @for (option of appearances; track option) {
          <label>
            <input type="radio" name="appearance" [checked]="appearance() === option" (change)="appearance.set(option)" />
            {{ option }}
          </label>
        }
      </fieldset>

      <fieldset>
        <legend>Animation</legend>
        @for (option of animations; track option.label) {
          <label>
            <input type="radio" name="animation" [checked]="animation() === option.value" (change)="animation.set(option.value)" />
            {{ option.label }}
          </label>
        }
      </fieldset>

      <fieldset>
        <legend>Count and size</legend>
        <label>
          Count
          <input type="number" min="1" max="12" [value]="count()" (input)="count.set($any($event.target).valueAsNumber)" />
        </label>
        <label>
          Size (circle and square)
          <input type="range" min="16" max="120" [value]="size()" (input)="size.set($any($event.target).valueAsNumber)" />
          {{ size() }}px
        </label>
      </fieldset>

      <div class="preview" [class.shapes]="appearance() !== 'line'">
        <ngx-skeleton-loader [appearance]="appearance()" [animation]="animation()" [count]="count()" [size]="size()" />
      </div>
    </main>
  `,
})(
  class {
    appearances = ['line', 'circle', 'square'];
    animations = [
      { label: 'progress', value: 'progress' },
      { label: 'progress-dark', value: 'progress-dark' },
      { label: 'pulse', value: 'pulse' },
      { label: 'pulse-dark', value: 'pulse-dark' },
      { label: 'none (false)', value: false },
    ];
    appearance = signal('circle');
    animation = signal('progress');
    count = signal(4);
    size = signal(56);

    constructor() {
      // Inputs are signals: the loader updates as soon as a binding changes.
      effect(() => {
        console.log(
          `appearance=${this.appearance()} animation=${this.animation()} count=${this.count()} size=${this.size()}`,
        );
      });
    }
  },
);

bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] });
