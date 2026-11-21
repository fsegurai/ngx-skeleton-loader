import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appConfig } from '@app/app.config';
import { DOCS_MANIFEST, docsFile } from '@app/app.constant';
import type { DocsManifestNode } from '@app/app.models';

/** A tiny manifest-generator output: one page and one folder, out of order. */
const MANIFEST: DocsManifestNode[] = [
  {
    label: 'Guides',
    route: 'content/guides',
    isParent: true,
    order: 2,
    children: [
      { label: 'Theming', route: 'content/guides/theming', order: 2 },
      { label: 'Appearances', route: 'content/guides/appearances', order: 1 },
    ],
  },
  { label: 'Documentation Home', route: 'content/README', order: 0 },
];

describe('DocsComponent', () => {
  let harness: RouterTestingHarness;
  let http: HttpTestingController;

  beforeEach(async () => {
    // The clipboard plugin needs the ClipboardJS global that angular.json loads as a script in the app.
    vi.stubGlobal('ClipboardJS', class {});
    TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting()] });
    harness = await RouterTestingHarness.create();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function pending(url: string) {
    return vi.waitFor(() => {
      const [request] = http.match(url);
      if (!request) throw new Error(`no request for ${url}`);
      return request;
    });
  }

  async function respond(page: string, markdown: string | null): Promise<void> {
    const request = await pending(docsFile(page));
    if (markdown === null) {
      // No stability wait: the 404 starts a navigation whose own request is still pending.
      request.flush('Not found', { status: 404, statusText: 'Not Found' });
      return;
    }
    request.flush(markdown);
    await harness.fixture.whenStable();
  }

  function view(): HTMLElement {
    return harness.routeNativeElement as HTMLElement;
  }

  it('loads the Markdown file mapped from the route and renders it', async () => {
    void harness.navigateByUrl('/docs/guides/theming');
    await respond('guides/theming', '---\nlabel: Theming\n---\n\n# Theming\n\nSome text.\n');

    expect(view().querySelector('markdown h1')?.textContent).toBe('Theming');
    expect(view().textContent).not.toContain('label: Theming');
  });

  it('loads the docs home page for /docs', async () => {
    void harness.navigateByUrl('/docs');
    await respond('', '# Home\n');

    expect(view().querySelector('markdown h1')?.textContent).toBe('Home');
  });

  it('shows a skeleton loader while the page loads, then removes it', async () => {
    void harness.navigateByUrl('/docs/guides/theming');
    const request = await pending(docsFile('guides/theming'));
    harness.fixture.detectChanges();

    const skeleton = view().querySelector('ngx-skeleton-loader');
    expect(skeleton).not.toBeNull();
    expect(skeleton?.getAttribute('aria-busy')).toBe('true');

    request.flush('# Theming\n');
    await harness.fixture.whenStable();
    expect(view().querySelector('ngx-skeleton-loader')).toBeNull();
  });

  it('opens the README of a folder route, then shows the not-found state for a missing page', async () => {
    void harness.navigateByUrl('/docs/guides');
    await respond('guides', null);
    await respond('guides/README', '# Guides\n');
    expect(TestBed.inject(Router).url).toBe('/docs/guides/README');

    void harness.navigateByUrl('/docs/missing');
    await respond('missing', null);
    await respond('missing/README', null);
    await harness.fixture.whenStable();

    expect(view().querySelector('h1')?.textContent).toBe('Page not found');
    expect(view().querySelector('ngx-skeleton-loader')).toBeNull();
  });

  it('builds the side navigation from the manifest, in manifest order', async () => {
    void harness.navigateByUrl('/docs');
    (await pending(DOCS_MANIFEST)).flush(MANIFEST);
    await respond('', '# Home\n');

    const nav = view().querySelector('nav.docs-nav') as HTMLElement;
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('a')];
    expect(links.map((link) => [link.textContent?.trim(), link.getAttribute('href')])).toEqual([
      ['Documentation Home', '/docs/README'],
      ['Appearances', '/docs/guides/appearances'],
      ['Theming', '/docs/guides/theming'],
    ]);
    expect(nav.textContent).toContain('Guides');
  });
});
