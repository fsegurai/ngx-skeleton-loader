import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY } from './app.constant';
import { Theme } from './app.models';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    document.body.className = '';
    TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting()] });

    fixture = TestBed.createComponent(AppComponent);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
    document.body.className = '';
  });

  it('renders the toolbar with the library name', () => {
    expect(element.querySelector('mat-toolbar')?.textContent).toContain('@fsegurai/ngx-skeleton-loader');
  });

  it('renders one tab per labelled route, linking to it', () => {
    const tabs = [...element.querySelectorAll<HTMLAnchorElement>('nav[mat-tab-nav-bar] a[mat-tab-link]')];
    expect(tabs.map((tab) => tab.textContent?.trim())).toEqual([
      expect.stringContaining('Docs'),
      expect.stringContaining('Examples'),
      expect.stringContaining('Playground'),
    ]);
    expect(tabs.map((tab) => tab.getAttribute('href'))).toEqual(['/docs', '/examples', '/playground']);
  });

  it('applies the default theme and toggles it, persisting the choice', async () => {
    expect(document.body.classList).toContain(`${DEFAULT_THEME}-theme`);

    element.querySelector<HTMLButtonElement>('button.theme-toggle')?.click();
    await fixture.whenStable();

    expect(document.body.classList).toContain(`${Theme.Dark}-theme`);
    expect(document.body.classList).not.toContain(`${Theme.Light}-theme`);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(Theme.Dark);
  });
});
