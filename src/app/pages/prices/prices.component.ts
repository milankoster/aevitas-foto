import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { PricesTitleComponent } from '../../components/prices/prices-title/prices-title.component';
import { PricingCardsComponent } from '../../components/prices/pricing-cards/pricing-cards.component';
import { PricesCtaComponent } from '../../components/prices/prices-cta/prices-cta.component';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    PricesTitleComponent,
    PricingCardsComponent,
    PricesCtaComponent,
  ],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesComponent {}

