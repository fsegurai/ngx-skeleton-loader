// The playground has no build step: Angular compiles the templates in the browser (JIT),
// so the compiler must be loaded before anything else.
import '@angular/compiler';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideSkeletonLoader, SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

const people = [
  { id: 1, name: 'Ada Lovelace', role: 'Analyst' },
  { id: 2, name: 'Grace Hopper', role: 'Compiler engineer' },
  { id: 3, name: 'Alan Turing', role: 'Researcher' },
];

/** A fake request: resolves after `ms` milliseconds. */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = Component({
  selector: 'app-root',
  imports: [SkeletonLoaderComponent],
  template: `
    <main>
      <h1>Loading states</h1>
      <p class="hint">Reload to see the placeholders again. Defaults come from provideSkeletonLoader.</p>
      <button type="button" (click)="load()" [disabled]="loading()">Reload</button>

      <h2>Team</h2>
      @if (team(); as team) {
        <ul class="team">
          @for (person of team; track person.id) {
            <li>
              <span class="avatar" aria-hidden="true">{{ person.name[0] }}</span>
              <span><strong>{{ person.name }}</strong><br />{{ person.role }}</span>
            </li>
          }
        </ul>
      } @else {
        <!-- count comes from the provider (3); the label is specific to this list. -->
        <ngx-skeleton-loader ariaLabel="Team" />
      }

      <h2>Featured card</h2>
      @if (card(); as card) {
        <article class="card">
          <div class="card__cover">{{ card.title }}</div>
          <p>{{ card.body }}</p>
        </article>
      } @else {
        <!-- custom-content projects any layout and keeps a single status region. It always renders one item: the
             provider count does not apply to it. -->
        <ngx-skeleton-loader appearance="custom-content" ariaLabel="Featured card" loadingText="Loading the featured card">
          <div class="card card--skeleton">
            <div class="card__cover"></div>
            <div class="bar"></div>
            <div class="bar bar--short"></div>
          </div>
        </ngx-skeleton-loader>
      }
    </main>
  `,
})(
  class {
    team = signal(undefined);
    card = signal(undefined);
    loading = signal(false);

    constructor() {
      this.load();
    }

    async load() {
      this.loading.set(true);
      this.team.set(undefined);
      this.card.set(undefined);
      console.log('loading…');
      await delay(1500);
      this.team.set(people);
      console.log('team loaded');
      await delay(1000);
      this.card.set({ title: 'Skeletons', body: 'Placeholders keep the layout stable while content loads.' });
      console.log('card loaded');
      this.loading.set(false);
    }
  },
);

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    // Application defaults: inputs still win, and undefined never overrides.
    provideSkeletonLoader({ animation: 'pulse', count: 3, loadingText: 'Loading content…' }),
  ],
});
