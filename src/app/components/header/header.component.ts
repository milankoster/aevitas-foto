import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MobileMenuComponent} from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isDimmed = false;
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
}
