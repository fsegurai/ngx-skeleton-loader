import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  type SkeletonLoaderAnimation,
  type SkeletonLoaderAppearance,
  SkeletonLoaderComponent,
  type SkeletonLoaderTheme,
} from 'ngx-skeleton-loader';
import { buildSnippet } from './playground-snippet';

/** Default values of the theme controls: the library defaults, left out of the theme until changed. */
const THEME_DEFAULTS = { color: '#eff1f6', height: 20, radius: 4, duration: 2 } as const;

/**
 * Interactive playground: a control for every `<ngx-skeleton-loader>` input, a live preview and the matching
 * HTML snippet.
 */
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    SkeletonLoaderComponent,
  ],
})
export default class PlaygroundComponent {
  private readonly clipboard = inject(Clipboard);
  private readonly snackbar = inject(MatSnackBar);

  protected readonly themeDefaults = THEME_DEFAULTS;
  protected readonly appearances: readonly SkeletonLoaderAppearance[] = ['line', 'circle', 'square', 'custom-content'];
  protected readonly animations: readonly SkeletonLoaderAnimation[] = [
    'progress',
    'progress-dark',
    'pulse',
    'pulse-dark',
    'false',
  ];

  protected readonly loading = signal(true);
  protected readonly count = signal(3);
  protected readonly appearance = signal<SkeletonLoaderAppearance>('line');
  protected readonly animation = signal<SkeletonLoaderAnimation>('progress');
  protected readonly size = signal<number | null>(null);
  protected readonly loadingText = signal('');
  protected readonly ariaLabel = signal('');
  protected readonly announce = signal(true);
  protected readonly color = signal<string | null>(null);
  protected readonly height = signal<number | null>(null);
  protected readonly radius = signal<number | null>(null);
  protected readonly duration = signal<number | null>(null);

  protected readonly hasSize = computed(() => this.appearance() === 'circle' || this.appearance() === 'square');

  /** The `theme` input: only the CSS custom properties changed from their defaults. */
  protected readonly theme = computed<SkeletonLoaderTheme>(() => {
    const theme: Record<string, string> = {};
    const color = this.color();
    const height = this.height();
    const radius = this.radius();
    const duration = this.duration();
    if (color !== null) theme['--ngx-skeleton-loader-color'] = color;
    if (height !== null) theme['--ngx-skeleton-loader-height'] = `${height}px`;
    if (radius !== null) theme['--ngx-skeleton-loader-radius'] = `${radius}px`;
    if (duration !== null) theme['--ngx-skeleton-loader-duration'] = `${duration}s`;
    return theme;
  });

  protected readonly snippet = computed(() =>
    buildSnippet({
      count: this.count(),
      appearance: this.appearance(),
      animation: this.animation(),
      size: this.size(),
      loadingText: this.loadingText(),
      ariaLabel: this.ariaLabel(),
      announce: this.announce(),
      theme: this.theme(),
    }),
  );

  protected animationLabel(animation: SkeletonLoaderAnimation): string {
    return animation === 'false' ? 'none' : String(animation);
  }

  protected setCount(event: Event): void {
    const value = Math.floor(Number((event.target as HTMLInputElement).value));
    this.count.set(Number.isFinite(value) && value >= 1 ? Math.min(value, 50) : 1);
  }

  protected text(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  /** Restores every control to its default value. */
  protected reset(): void {
    this.loading.set(true);
    this.count.set(3);
    this.appearance.set('line');
    this.animation.set('progress');
    this.size.set(null);
    this.loadingText.set('');
    this.ariaLabel.set('');
    this.announce.set(true);
    this.color.set(null);
    this.height.set(null);
    this.radius.set(null);
    this.duration.set(null);
  }

  protected copySnippet(): void {
    const copied = this.clipboard.copy(this.snippet());
    this.snackbar.open(copied ? 'Snippet copied to the clipboard' : 'The snippet could not be copied', undefined, {
      duration: 3000,
    });
  }
}
