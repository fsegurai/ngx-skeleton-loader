// The playground has no build step: Angular compiles the templates in the browser (JIT),
// so the compiler must be loaded before anything else.
import '@angular/compiler';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SkeletonLoaderComponent } from '@fsegurai/ngx-skeleton-loader';

const App = Component({
  selector: 'app-root',
  imports: [SkeletonLoaderComponent],
  template: `
    <main>
      <h1>Basic usage</h1>

      <section>
        <h2>One line (all defaults)</h2>
        <ngx-skeleton-loader />
      </section>

      <section>
        <h2>Three lines</h2>
        <ngx-skeleton-loader count="3" />
      </section>

      <section>
        <h2>Custom label and loading text</h2>
        <!-- Screen readers announce "Loading the article body" in a region named "Article". -->
        <ngx-skeleton-loader count="2" ariaLabel="Article" loadingText="Loading the article body" />
      </section>

      <section>
        <h2>Other selectors</h2>
        <skeleton-loader count="1" />
        <div skeleton-loader count="1"></div>
      </section>
    </main>
  `,
})(class {});

bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).then(() => {
  // Every loader is one polite status region; its items are hidden from assistive technologies.
  const regions = document.querySelectorAll('[role="status"]');
  console.log(`${regions.length} status regions rendered`);
});
