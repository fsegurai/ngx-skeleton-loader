import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import {
  type SkeletonLoaderAnimation,
  type SkeletonLoaderAppearance,
  SkeletonLoaderComponent,
} from 'ngx-skeleton-loader';

/** A themed sample: CSS custom properties set on a wrapper, inherited by every skeleton inside it. */
interface ThemeSample {
  readonly title: string;
  readonly description: string;
  readonly variables: Readonly<Record<string, string>>;
}

/**
 * Live gallery of the skeleton loader: every appearance and animation, theming through CSS custom properties, a
 * profile card that switches between loading and loaded, and custom content.
 */
@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KeyValuePipe, MatCardModule, MatSlideToggleModule, RouterLink, SkeletonLoaderComponent],
})
export default class ExamplesComponent {
  protected readonly appearances: readonly Exclude<SkeletonLoaderAppearance, 'custom-content'>[] = [
    'line',
    'circle',
    'square',
  ];
  protected readonly animations: readonly SkeletonLoaderAnimation[] = [
    'progress',
    'progress-dark',
    'pulse',
    'pulse-dark',
    false,
  ];

  protected readonly themes: readonly ThemeSample[] = [
    {
      title: 'Brand color',
      description: 'Tinted items with a matching shimmer.',
      variables: {
        '--ngx-skeleton-loader-color': '#d6ebff',
        '--ngx-skeleton-loader-highlight': 'rgb(255 255 255 / 80%)',
      },
    },
    {
      title: 'Pills',
      description: 'Taller, fully rounded lines.',
      variables: {
        '--ngx-skeleton-loader-height': '28px',
        '--ngx-skeleton-loader-radius': '999px',
        '--ngx-skeleton-loader-gap': '12px',
      },
    },
    {
      title: 'Slow and sharp',
      description: 'Square corners and a slower animation.',
      variables: {
        '--ngx-skeleton-loader-radius': '0',
        '--ngx-skeleton-loader-duration': '4s',
      },
    },
    {
      title: 'Large shapes',
      description: 'Circle and square size from one variable.',
      variables: { '--ngx-skeleton-loader-shape-size': '64px' },
    },
  ];

  /** Whether the profile card shows its content (`true`) or its skeleton (`false`). */
  protected readonly profileLoaded = signal(false);

  protected animationLabel(animation: SkeletonLoaderAnimation): string {
    return animation === false ? 'none' : animation;
  }
}
