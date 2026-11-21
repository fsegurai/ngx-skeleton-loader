export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export function isTheme(value: unknown): value is Theme {
  return value != null && typeof value === 'string' && Object.values(Theme).includes(value as Theme);
}

/** A node of the docs `manifest.json` written by manifest-generator. */
export interface DocsManifestNode {
  readonly label: string;
  /** Manifest route, e.g. `content/guides/theming`; a folder node routes to the folder itself. */
  readonly route: string;
  readonly description?: string;
  readonly order?: number;
  readonly icon?: string;
  readonly isParent?: boolean;
  readonly children?: readonly DocsManifestNode[];
}
