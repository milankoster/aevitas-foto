import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle, TranslocoModule, RouterLink],
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
      // Append '\u00A0kr' so the currency is visible (e.g. "1,500\u00A0kr").
      return `${formatted}\u00A0kr`;
    }

    const formattedWithDecimals = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(priceNumber);
    // Replace decimal dot with comma to keep comma as decimal separator
    // Replace decimal dot with comma and append 'kr' with a non-breaking space.
    return `${formattedWithDecimals.replace('.', ',')}\u00A0kr`;
  });
}
