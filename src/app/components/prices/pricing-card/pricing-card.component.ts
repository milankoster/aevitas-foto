import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoModule],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingCardComponent {
  readonly titleKey = input.required<string>();
  readonly price = input.required<number>();
  readonly currency = input<string>('SEK');
  readonly descriptionKey = input.required<string>();
  readonly imageSrc = input.required<string>();
  readonly imageAltKey = input.required<string>();
  readonly reversed = input<boolean>(false);

  private readonly transloco = inject(TranslocoService);
  private readonly activeLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  readonly formattedPrice = computed(() => {
    const lang = this.activeLang();
    const locale = lang === 'sv' ? 'sv-SE' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency(),
      maximumFractionDigits: 0,
    }).format(this.price());
  });
}

