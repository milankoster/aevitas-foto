import { Component, Input, Output, EventEmitter } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
