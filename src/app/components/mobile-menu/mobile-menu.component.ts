import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  readonly open = input(false);
  @Output() readonly menuClose = new EventEmitter<void>();

  onClose(): void {
    this.menuClose.emit();
  }
}
