import { HttpClient } from '@angular/common/http';
import { Injectable, inject, type Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DOCS_MANIFEST } from '@app/app.constant';
import type { DocsManifestNode } from '@app/app.models';
import { catchError, map, of } from 'rxjs';

/**
 * Sorts a manifest tree by `order` (nodes without one go last), keeping the manifest order for ties.
 * @param nodes The nodes of one level.
 * @returns A sorted copy, with every level sorted.
 */
export function sortManifest(nodes: readonly DocsManifestNode[]): DocsManifestNode[] {
  return nodes
    .map((node) => (node.children ? { ...node, children: sortManifest(node.children) } : node))
    .sort((a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY));
}

/**
 * The docs navigation tree, read once from the generated `manifest.json` (an empty tree when it cannot be loaded).
 */
@Injectable({ providedIn: 'root' })
export class DocsManifestService {
  readonly nodes: Signal<readonly DocsManifestNode[]> = toSignal(
    inject(HttpClient)
      .get<DocsManifestNode[]>(DOCS_MANIFEST)
      .pipe(
        map((nodes) => (Array.isArray(nodes) ? sortManifest(nodes) : [])),
        catchError((error: unknown) => {
          console.error('Docs manifest could not be loaded:', error);
          return of([]);
        }),
      ),
    { initialValue: [] },
  );
}
