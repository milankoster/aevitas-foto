import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PricingCardComponent } from '../pricing-card/pricing-card.component';

type PricingTier = {
  readonly titleKey: string;
  // price and currency are now stored in translation files; pass keys instead
  readonly priceKey: string;
  readonly currencyKey: string;
  readonly descriptionKey: string;
  readonly imageSrc: string;
  readonly imageAltKey: string;
}

@Component({
  selector: 'app-pricing-cards',
  standalone: true,
  imports: [PricingCardComponent],
  templateUrl: './pricing-cards.component.html',
  styleUrl: './pricing-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingCardsComponent {
  readonly tiers: readonly PricingTier[] = [
    {
      titleKey: 'prices.tiers.mini.title',
      priceKey: 'prices.tiers.mini.price',
      currencyKey: 'prices.tiers.mini.currency',
      descriptionKey: 'prices.tiers.mini.description',
      imageSrc: 'assets/gallery/Dogs/DSC_0107-1100.avif',
      imageAltKey: 'prices.tiers.mini.imageAlt',
    },
    {
      titleKey: 'prices.tiers.standard.title',
      priceKey: 'prices.tiers.standard.price',
      currencyKey: 'prices.tiers.standard.currency',
      descriptionKey: 'prices.tiers.standard.description',
      imageSrc: 'assets/gallery/Dogs/DSC_0528-1100.avif',
      imageAltKey: 'prices.tiers.standard.imageAlt',
    },
    {
      titleKey: 'prices.tiers.premium.title',
      priceKey: 'prices.tiers.premium.price',
      currencyKey: 'prices.tiers.premium.currency',
      descriptionKey: 'prices.tiers.premium.description',
      imageSrc: 'assets/gallery/Dogs/IMG_0615-1100.avif',
      imageAltKey: 'prices.tiers.premium.imageAlt',
    },
  ];
}


