import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent {}
