import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-faq',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {}
