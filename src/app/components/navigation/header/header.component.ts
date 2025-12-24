import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, TranslocoModule, LanguageToggleComponent, MobileNavComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly fixedNav = input<boolean>(false); // Single parameter: false = contact style, true = hero style

  get backgroundColor(): string {
    return this.fixedNav() ? 'lg:bg-black/60' : 'bg-outer-space';
  }

  get isFixedMobileNav(): boolean {
    return this.fixedNav();
  }
}
