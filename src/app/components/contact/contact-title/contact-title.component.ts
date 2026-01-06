import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-contact-title',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './contact-title.component.html',
  styleUrl: './contact-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTitleComponent {}
