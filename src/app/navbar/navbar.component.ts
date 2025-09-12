import { Component, Input } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() isDimmed = false;
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
