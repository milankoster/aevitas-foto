import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MobileMenuComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly isDimmed = input(false);
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
}
