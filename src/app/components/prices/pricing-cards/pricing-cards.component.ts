import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PricingCardComponent } from '../pricing-card/pricing-card.component';

type PricingTier = {
  readonly titleKey: string;
  readonly price: number;
  readonly descriptionKey: string;
  readonly imageSrc: string;
  readonly imageAltKey: string;
};

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
      descriptionKey: 'prices.tiers.mini.description',
      imageSrc: 'assets/gallery/Dogs/IMG_9954-1100.avif',
      imageAltKey: 'prices.tiers.mini.imageAlt',
    },
    {
      titleKey: 'prices.tiers.standard.title',
      price: 2500,
      descriptionKey: 'prices.tiers.standard.description',
      imageSrc: 'assets/gallery/Dogs/DSC_0528-1100.avif',
      imageAltKey: 'prices.tiers.standard.imageAlt',
    },
    {
      titleKey: 'prices.tiers.premium.title',
      price: 3900,
      descriptionKey: 'prices.tiers.premium.description',
      imageSrc: 'assets/gallery/Dogs/IMG_0615-1100.avif',
      imageAltKey: 'prices.tiers.premium.imageAlt',
    },
  ];
}
