import type { SkeletonLoaderAnimation, SkeletonLoaderAppearance, SkeletonLoaderTheme } from 'ngx-skeleton-loader';

/** The values of the playground controls. `undefined`/`null` values are left out of the snippet. */
export interface PlaygroundState {
  readonly count: number;
  readonly appearance: SkeletonLoaderAppearance;
  readonly animation: SkeletonLoaderAnimation;
  readonly size: number | null;
  readonly loadingText: string;
  readonly ariaLabel: string;
  readonly announce: boolean;
  readonly theme: SkeletonLoaderTheme;
}

/** Escapes a value for a double-quoted HTML attribute. */
function attribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Formats a theme as a template object literal with single-quoted keys and values. */
function themeLiteral(theme: SkeletonLoaderTheme): string {
  const entries = Object.entries(theme)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `'${key}': ${typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value}`);
  return entries.length ? `{ ${entries.join(', ')} }` : '';
}

/**
 * The `<ngx-skeleton-loader>` markup of the playground state. Built-in defaults (`line`, `progress`, empty texts, `announce`)
 * are omitted; `count` is always shown.
 * @param state The values of the controls.
 * @returns The HTML snippet.
 */
export function buildSnippet(state: PlaygroundState): string {
  const attributes = [`count="${state.count}"`];
  if (state.appearance !== 'line') attributes.push(`appearance="${state.appearance}"`);
  if (state.animation !== 'progress') attributes.push(`animation="${String(state.animation)}"`);
  if (state.size !== null && (state.appearance === 'circle' || state.appearance === 'square')) {
    attributes.push(`size="${state.size}"`);
  }
  if (state.loadingText) attributes.push(`loadingText="${attribute(state.loadingText)}"`);
  if (state.ariaLabel) attributes.push(`ariaLabel="${attribute(state.ariaLabel)}"`);
  if (!state.announce) attributes.push('announce="false"');
  const theme = themeLiteral(state.theme);
  if (theme) attributes.push(`[theme]="${theme}"`);

  const body =
    state.appearance === 'custom-content' ? '>\n  <!-- your placeholder markup -->\n</ngx-skeleton-loader>' : '/>';
  return `<ngx-skeleton-loader\n${attributes.map((item) => `  ${item}`).join('\n')}\n${body}`;
}
