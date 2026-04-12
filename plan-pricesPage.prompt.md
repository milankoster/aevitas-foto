## Plan: Prices Page — Alternating Pricing Cards with CTA

A new `/prices` page with a solid `outer-space` header, a title section, alternating horizontal image+text pricing cards (image-as-background on mobile), a call-to-action section, and a footer. All text is transloco-driven; pricing data is a static TS array.

### Steps

**1. Update Navigation**

- [ ] Rename `bookings` → `prices` nav key in [`shared/en.json`](src/app/i18n/shared/en.json) and [`sv.json`](src/app/i18n/shared/sv.json) (e.g. EN: `"Prices"`, SV: `"Priser"`)
- [ ] Update `routerLink="/bookings"` → `routerLink="/prices"` and i18n key in [`header.component.html`](src/app/components/navigation/header/header.component.html)
- [ ] Update same in [`mobile-menu.component.html`](src/app/components/navigation/mobile-menu/mobile-menu.component.html)

**2. Create Page & Route**

- [ ] Create `src/app/pages/prices/prices.component.{ts,html,scss}` — `page-root` wrapper with `<app-header/>` (no `fixedNav` input, defaults to `bg-outer-space`), section components, and `<app-footer/>`
- [ ] Add lazy-loaded route `path: 'prices'` to [`app.routes.ts`](src/app/app.routes.ts)

**3. Build `prices-title` Component**

- [ ] Create `src/app/components/prices/prices-title/` — mirrors [`contact-title`](src/app/components/contact/contact-title/contact-title.component.html) with an `<h1>` page heading and a short intro paragraph, both from i18n keys (e.g. `prices.title`, `prices.description`)

**4. Build `pricing-card` Component**

- [ ] Create `src/app/components/prices/pricing-card/` as a presentational component with `@Input()` for `title`, `price`, `description`, `imageSrc`, `imageAlt`, and `reversed: boolean`
- [ ] **Desktop (`md+`):** `flex-row` card, image takes ~50% width (`object-cover`, `rounded-lg`, `shadow-xl`); text side holds title (`font-nunito`), price (`text-bronze`, `font-nunito`), description (`font-montserrat font-light`); apply `flex-row-reverse` when `reversed` is true
- [ ] **Mobile:** single stacked block — image fills the full card height as a CSS `background-image` with a `bg-black/50` overlay; title, price, and description are centred on top in `text-whitesmoke`. The text that is next to the card on desktop should be on top of the image, not a duplicate.
- [ ] Use `NgOptimizedImage` with the `-1100.avif` placeholder files from `assets/gallery/Dogs/`
- [ ] Cards should be a single visual unit: wrap image+text in a `.pricing-card` element with `overflow-hidden`, `rounded-lg`, `bg-timberwolf` consistent `p-6` padding on the text side (desktop), and `shadow-xl` so the image and text read as one component rather than two unrelated columns.
- [ ] On desktop the image should be clipped to the card's border-radius so the card looks unified (image and text share the same rounded corners where they meet). Use `object-cover` and `overflow-hidden` on the image container.
- [ ] Keep text and image aligned to the same centered max-width: each card's inner container should be constrained to `max-w-8xl mx-auto px-6 md:px-8` so cards align with other page content.
- [ ] Add a small vertical rhythm: consistent `gap-6` between cards, and equal horizontal gutters inside each card so title/price/description align with other section text.
- [ ] Ensure images sit flush against the card edge with no visible gap on desktop:
  - [ ] Wrap the image and text in a single `.pricing-card__inner` container constrained to the page grid (`max-w-8xl 2xl:max-w-9xl mx-auto px-6 md:px-8`).
  - [ ] On desktop (`md+`) use a two-column layout with no gutter between columns (e.g. `grid grid-cols-1 md:grid-cols-2` or `flex` with `gap-0 md:gap-0`) so the image and text meet edge-to-edge.
  - [ ] Apply `overflow-hidden` and the same `rounded-lg` to the overall card and to the image wrapper so the image is clipped to the card border-radius (this prevents visual gap and keeps the image and text as one unit).
  - [ ] Ensure the text side uses internal padding (e.g. `p-6`) but that padding is not applied to the image column so there is no outer gap between image and card edge.

- [ ] Make currency amounts locale-aware instead of hardcoded strings:
  - [ ] Move from translating full price strings to translating numeric prices and (optionally) currency code/symbol.
    - e.g. `tiers[].price = 450` and `tiers[].currency = 'SEK'` or `tiers[].currencyKey = 'currency.SEK'`.
  - [ ] Format the displayed price in the `pricing-card` using Angular's `CurrencyPipe` or `Intl.NumberFormat` with the current Transloco language/locale so `sv` uses Swedish formatting and `en` uses English formatting (currency symbol or code may differ per locale).
  - [ ] Update `src/app/pages/prices/i18n/en.json` and `sv.json` to remove full-price strings and instead include any currency-labels or localized suffixes if needed (keep `imageAlt` and descriptions as-is).
  - [ ] Ensure the `pricing-cards` static `tiers` array contains numeric price values (not pre-formatted strings) so formatting is runtime-driven by locale.

- [ ] Ensure mobile (sm) shows the mobile-specific layout only (image-as-background with overlay) and does NOT render the desktop image+text side:
  - [ ] On small screens hide the desktop image element and hide the separate text column; show only the mobile overlay block that uses `background-image` and centers the text on top (`md:hidden` for overlay visibility and `hidden md:block` for desktop-only pieces).
  - [ ] Ensure there is a single source-of-truth for the card text (do not duplicate the text in both desktop text column and mobile overlay). Prefer rendering the textual content once and use CSS/positioning to move it on top of the mobile background — or render text twice but keep one of the renders visually hidden purely via responsive classes (avoid duplicate ARIA/SEO issues by keeping accessible text available to screen readers using `sr-only` when necessary).
  - [ ] Verify touch/keyboard accessibility on mobile overlay (button/tab order, contrast of overlay text, tappable CTA if applicable).

**5. Build `pricing-cards` Component**

- [ ] Create `src/app/components/prices/pricing-cards/` as a container with a static `readonly tiers` array defined in the `.ts` (e.g. 3 tiers: Mini, Standard, Premium), each entry referencing i18n keys and a `assets/gallery/Dogs/` placeholder image
- [ ] Iterate with `@for` and pass `reversed = index % 2 !== 0` to each `pricing-card`
- [ ] Wrap in a `<section>` with `bg-linen` and standard container spacing
- [ ] Ensure the list of cards and each card's inner content use the same page container constraints: `max-w-8xl 2xl:max-w-9xl mx-auto px-6 md:px-8`. This guarantees the cards align with the title, other sections and the site's grid.


- **6. Build `prices-cta` Component**
- [ ] Create `src/app/components/prices/prices-cta/` — styled like the [`banner`](src/app/components/home/banner/banner.component.html) (background image with dark overlay), with a translated tagline (e.g. *"Not sure which package fits you? Let's talk."*) and a `font-buttons` `routerLink="/contact"` button
- [ ] Use a suitable placeholder image from `assets/gallery/Dogs/` until a dedicated CTA image is provided
- [ ] Use background image: `assets/gallery/Dogs/DSC_3299-600.avif` as the CTA background placeholder.
- [ ] CTA text (exact): `"Not sure what package fits you? Let's talk"`
- [ ] CTA button label (exact): `"Contact"` and must be a `font-buttons` styled `routerLink="/contact"`.


- **7. Add i18n & Wire Transloco**
- [ ] Create `src/app/pages/prices/i18n/en.json` and `sv.json` with keys for: page title, description, CTA text + button label, and per-tier title/price/description/imageAlt
- [ ] Import and merge prices translations in [`transloco.config.ts`](src/app/i18n/transloco.config.ts) for both `en` and `sv`


- **8. Finishing Touches**
- [ ] Replace `assets/gallery/Dogs/` placeholder images with dedicated pricing photography from Caeli
- [ ] Verify active nav link highlight (`.active-link`) works correctly on `/prices`
- [ ] Accessibility pass: `alt` text, keyboard focus order, sufficient colour contrast on mobile overlay text
