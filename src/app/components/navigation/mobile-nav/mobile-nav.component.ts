import { ChangeDetectionStrategy, Component, input, OnDestroy } from '@angular/core';
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
export class MobileNavComponent implements OnDestroy {
  readonly isDimmed = input<boolean>(false);
  mobileMenuOpen = false;

  get backgroundColor(): string {
    const bgColor = this.isDimmed() ? 'transparent' : 'bg-outer-space';
    return `${bgColor}`;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }
}
