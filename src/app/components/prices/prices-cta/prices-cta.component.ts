import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-prices-cta',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, TranslocoModule],
  templateUrl: './prices-cta.component.html',
  styleUrl: './prices-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesCtaComponent {}

