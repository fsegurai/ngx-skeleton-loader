import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TOOLBAR_HEIGHT } from '@app/app.constant';
import { Theme } from '@app/app.models';
import { AnchorService } from '@shared/anchor';
import { ThemeService } from '@shared/theme';

/** A tab of the demo navigation: a top-level route with a `label` (and optional Material Symbols `icon`). */
interface NavTab {
  readonly path: string;
  readonly label: string;
  readonly icon: string | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(() => this.themeService.theme() === Theme.Dark);
  protected readonly tabs: readonly NavTab[] = inject(Router).config.flatMap((route) => {
    const label = route.data?.['label'];
    return route.path && typeof label === 'string'
      ? [{ path: route.path, label, icon: route.data?.['icon'] as string | undefined }]
      : [];
  });

  constructor() {
    inject(AnchorService).setOffset([0, TOOLBAR_HEIGHT]);
    this.themeService.init();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
