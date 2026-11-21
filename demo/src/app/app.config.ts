import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  SecurityContext,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from '@app/app.routes';
import { markedOptionsFactory } from '@app/marked-options-factory';
import { MARKED_OPTIONS, provideMarkdown, withClipboard, withEmoji, withPrism } from '@fsegurai/ngx-markdown';
import { AnchorService } from '@shared/anchor';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { provideSkeletonLoader } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideMarkdown({
      loader: HttpClient,
      // Prism highlights the code blocks (the Prism global loaded in angular.json), Emoji renders the `[emoji]`
      // shortnames, and Clipboard gives the code blocks the demo copy button
      plugins: [withPrism(), withEmoji(), withClipboard({ buttonComponent: ClipboardButtonComponent })],
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      // Angular's HTML sanitizer strips `id` attributes, which the heading anchors need. Only trusted content is
      // rendered: the demo's own versioned docs (same origin). Never pass user-provided Markdown through this
      // configuration.
      sanitize: SecurityContext.NONE,
    }),
    // Application-wide defaults of every <ngx-skeleton-loader> of the demo (inputs still override them).
    provideSkeletonLoader({ animation: 'progress', loadingText: 'Loading content...' }),
  ],
};
