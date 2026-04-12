import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PricingCardComponent } from '../pricing-card/pricing-card.component';

type PricingTier = {
  readonly titleKey: string;
  readonly price: number;
  readonly currency: string;
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
      price: 1500,
      currency: 'SEK',
      descriptionKey: 'prices.tiers.mini.description',
      imageSrc: 'assets/gallery/Dogs/DSC_0107-1100.avif',
      imageAltKey: 'prices.tiers.mini.imageAlt',
    },
    {
      titleKey: 'prices.tiers.standard.title',
      price: 2500,
      currency: 'SEK',
      descriptionKey: 'prices.tiers.standard.description',
      imageSrc: 'assets/gallery/Dogs/DSC_0528-1100.avif',
      imageAltKey: 'prices.tiers.standard.imageAlt',
    },
    {
      titleKey: 'prices.tiers.premium.title',
      price: 3900,
      currency: 'SEK',
      descriptionKey: 'prices.tiers.premium.description',
      imageSrc: 'assets/gallery/Dogs/IMG_0615-1100.avif',
      imageAltKey: 'prices.tiers.premium.imageAlt',
    },
  ];
}


