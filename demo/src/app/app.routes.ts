import type { Routes } from '@angular/router';
import { DOCS_ROUTE } from '@app/app.constant';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DOCS_ROUTE,
  },
  {
    // Every documentation page: the rest of the URL is the page path (`/docs/guides/theming`).
    path: DOCS_ROUTE,
    children: [{ path: '**', loadComponent: () => import('./docs/docs.component') }],
    data: { label: 'Docs', icon: 'menu_book' },
  },
  {
    path: 'examples',
    loadComponent: () => import('./examples/examples.component'),
    data: { label: 'Examples', icon: 'view_quilt' },
  },
  {
    path: 'playground',
    loadComponent: () => import('./playground/playground.component'),
    data: { label: 'Playground', icon: 'tune' },
  },
  {
    path: '**',
    redirectTo: DOCS_ROUTE,
  },
];
