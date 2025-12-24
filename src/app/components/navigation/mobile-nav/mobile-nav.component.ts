import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, MobileMenuComponent, NgOptimizedImage, TranslocoModule],
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  readonly isDimmed = input<boolean>(false);
  mobileMenuOpen = false;

  get backgroundColor(): string {
    const bgColor = this.isDimmed() ? 'transparent' : 'bg-outer-space';
    return `${bgColor}`;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
