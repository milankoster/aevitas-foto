import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoModule, RouterLink],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingCardComponent {
  readonly titleKey = input.required<string>();
  readonly price = input.required<number>();
  readonly descriptionKey = input.required<string>();
  readonly imageSrc = input.required<string>();
  readonly imageAltKey = input.required<string>();
  readonly reversed = input<boolean>(false);

  readonly formattedPrice = computed(() => {
    const priceNumber = this.price();
    const hasFraction = Math.abs(priceNumber % 1) > 1e-9;

    // Use comma as thousands separator (en-US grouping), then convert decimal dot to comma
    // and append ':-' as requested. For whole amounts we omit decimals.
    if (!hasFraction) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(priceNumber);
      return `${formatted}:-`;
    }

    const formattedWithDecimals = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(priceNumber);
    // Replace decimal dot with comma to keep comma as decimal separator
    return `${formattedWithDecimals.replace('.', ',')}:-`;
  });
}
