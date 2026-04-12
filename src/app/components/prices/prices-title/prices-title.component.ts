import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-prices-title',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './prices-title.component.html',
  styleUrl: './prices-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesTitleComponent {}

