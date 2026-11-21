import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { appConfig } from '@app/app.config';
import PlaygroundComponent from './playground.component';

describe('PlaygroundComponent', () => {
  let fixture: ComponentFixture<PlaygroundComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting()] });
    fixture = TestBed.createComponent(PlaygroundComponent);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  function previewItems(): HTMLElement[] {
    return [...element.querySelectorAll<HTMLElement>('.playground-preview .skeleton-loader')];
  }

  function snippet(): string {
    return element.querySelector('.playground-snippet code')?.textContent ?? '';
  }

  function toggle(group: string, value: string): void {
    const button = element.querySelector<HTMLButtonElement>(
      `mat-button-toggle-group[name="${group}"] mat-button-toggle[value="${value}"] button`,
    );
    if (!button) throw new Error(`no ${value} toggle in ${group}`);
    button.click();
  }

  it('renders the default skeleton and its snippet', () => {
    expect(previewItems()).toHaveLength(3);
    expect(snippet()).toContain('<ngx-skeleton-loader');
    expect(snippet()).toContain('count="3"');
  });

  it('updates the preview and the snippet when the appearance changes', async () => {
    toggle('appearance', 'circle');
    await fixture.whenStable();

    expect(previewItems().every((item) => item.classList.contains('circle'))).toBe(true);
    expect(snippet()).toContain('appearance="circle"');
  });

  it('updates the preview and the snippet when the animation changes', async () => {
    toggle('animation', 'pulse');
    await fixture.whenStable();

    expect(previewItems().every((item) => item.classList.contains('pulse'))).toBe(true);
    expect(snippet()).toContain('animation="pulse"');
  });

  it('updates the number of items when the count changes', async () => {
    const input = element.querySelector<HTMLInputElement>('input[name="count"]') as HTMLInputElement;
    input.value = '5';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(previewItems()).toHaveLength(5);
    expect(snippet()).toContain('count="5"');
  });

  it('makes the preview decorative and adds announce="false" to the snippet when announce is off', async () => {
    const loader = () => element.querySelector('.playground-preview ngx-skeleton-loader') as HTMLElement;
    expect(loader().getAttribute('role')).toBe('status');
    expect(snippet()).not.toContain('announce');

    const announceToggle = element.querySelector<HTMLButtonElement>('.announce-toggle button');
    if (!announceToggle) throw new Error('no announce toggle');
    announceToggle.click();
    await fixture.whenStable();

    expect(loader().getAttribute('aria-hidden')).toBe('true');
    expect(loader().hasAttribute('role')).toBe(false);
    expect(snippet()).toContain('announce="false"');
  });

  it('applies the theme color as a CSS custom property', async () => {
    const input = element.querySelector<HTMLInputElement>('input[name="color"]') as HTMLInputElement;
    input.value = '#ff0000';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(previewItems()[0].style.getPropertyValue('--ngx-skeleton-loader-color')).toBe('#ff0000');
    expect(snippet()).toContain("'--ngx-skeleton-loader-color': '#ff0000'");
  });
});
