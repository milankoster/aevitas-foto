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
  // Price and currency are now stored in translations. We accept keys
  // that point to the translated values (no fallbacks).
  readonly priceKey = input.required<string>();
  readonly currencyKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly imageSrc = input.required<string>();
  readonly imageAltKey = input.required<string>();
  readonly reversed = input<boolean>(false);

  private readonly transloco = inject(TranslocoService);
  private readonly activeLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });
  // React to transloco events (for example when translations are loaded)
  // so that the computed price re-evaluates even when the language hasn't changed.
  private readonly translocoEvents = toSignal(this.transloco.events$, { initialValue: null });

  readonly formattedPrice = computed(() => {
    // Ensure we re-evaluate when translations load or transloco emits events.
    this.translocoEvents();

    const lang = this.activeLang();
    // Use Swedish locale for 'sv', otherwise use an English (EU) locale.
    // When the active language is English we show values in EUR (per request).
    const locale = lang === 'sv' ? 'sv-SE' : 'en-IE';
    // Read price and currency from translations using provided keys.
    // No fallback: if translations are missing, the raw translated value is used.
    const priceRaw = this.transloco.translate(this.priceKey());
    const currencyCode = this.transloco.translate(this.currencyKey());

    // Try to parse price as number. If parsing fails, return the raw value.
    const priceNumber = Number(priceRaw);
    if (Number.isFinite(priceNumber)) {
      // Only use currency formatting when the translated currency looks like a 3-letter code.
      const currencyIsCode = typeof currencyCode === 'string' && /^[A-Za-z]{3}$/.test(currencyCode);
      if (currencyIsCode) {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode.toUpperCase(),
          maximumFractionDigits: 0,
        }).format(priceNumber);
      }

      // If currency is not a valid 3-letter code, format as a plain number
      // and append the raw currency string if present (this avoids Intl RangeError
      // while still using translator-provided currency values — no automatic fallback).
      const formattedNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(priceNumber);
      return currencyCode ? `${formattedNumber} ${currencyCode}` : formattedNumber;
    }

    // If price is not a number (e.g. the translator provided a pre-formatted string),
    // return it as-is (no additional formatting / no fallback).
    return String(priceRaw);
  });
}

