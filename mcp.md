Aevitas Foto Angular Project Guidelines

1. General Best Practices

- Use Standalone Components: All new components should be standalone unless there is a strong reason to use NgModules.
- Change Detection: Use ChangeDetectionStrategy.OnPush for all components to optimize performance.
- TypeScript Strictness: Use strict typing and avoid any. Prefer explicit types and readonly where possible.
- File Organization: Group components by feature (e.g., /components/home/, /components/navigation/). Use clear, descriptive filenames and folder names.
- Accessibility: Ensure semantic HTML, alt text for images, good color contrast, and keyboard navigation for interactive elements.
- Responsiveness: Use Tailwind CSS utility classes for responsive layouts on mobile, tablet, and desktop.


2. Libraries and Versions

- Angular version ^19.2.0 (core packages), ^19.2.15 (forms), ^19.2.16 (CLI/build)
- Tailwind CSS version ^4.1.13: Use Tailwind for all layout, spacing, and color utilities. Custom colors and fonts should be defined in src/styles.scss.
- FontAwesome version ^7.0.1: Use FontAwesome for icons. Import via CDN or npm as appropriate.
- NgOptimizedImage: Use Angular’s NgOptimizedImage for all images for better performance.
- Router: Use Angular Router with lazy loading for all pages.
- Swiper version ^12.0.1: Use Swiper for image carousels. Look at src/home/components/mini-gallery for example usage.
- RxJS: version ~7.8.0
- TypeScript: ~5.7.2
- Prettier: ^3.6.2
- ESLint: ^9.35.0


3. Styling

- SCSS: Use SCSS for custom styles. Prefer Tailwind utility classes for most styling; use SCSS for custom effects or large CSS classes that are frequently re-used.
- Custom Properties: Define colors and fonts in :root in your src/styles.scss.
- Typography: Use imported Google Fonts. Font families should be set via CSS variables and Tailwind config.
- Consistent Spacing: Use consistent padding, margin, and max-width classes (max-w-8xl, px-6, etc.) for containers.
- **Fonts:**
  - Baloo 2 for logo and main headings (`font-logo`, `font-header-links`)
  - Playfair Display for section headings (`font-playfair`)
  - Nunito for body text and buttons (`font-nunito`, `font-buttons`)
- **Colors:**
  Some colours are defined separately in styles.scss:
  - Main text: `whitesmoke`, `charcoal`
  - Backgrounds:
    - Header: transparent, `rgba(0,0,0,0.3)` for dimmed navbar,
      - Header dropdown: `outer-space`,
      - Social icons: `hover:text-pink-400`, `hover:text-blue-400`.
    - Sections: `isabelline`,
    - Footer and mobile menu: `outer-space`,
  - Accents: `text-pink-400`, `text-blue-400` for icon hovers
- **Spacing & Layout:**
  - pt-6 for section top padding
  - Containers: `max-w-8xl mx-auto px-6 md:px-8 pt-6 md:pt-12 lg:pt-16 flex flex-col items-center`
  - Navbar/Footer: `px-4 py-3` (navbar), `py-7` (footer)
  - Links: `px-2` for nav links, `space-x-4` for horizontal spacing
- **Buttons:**
  - Rounded, shadowed, uppercase, letter spacing, color and background from custom properties, e.g. `.font-buttons` and Tailwind `rounded shadow-lg px-6 py-3`
  - Header language toggle uses a transparent dropdown button with `border-white/40` as subtle border and highlights/backshadow on focus/active.

- **Other:**
  - Custom underline for nav links via `.custom-underline` (pseudo-element, offset)
  - Responsive images: `NgOptimizedImage`, `object-cover`, `rounded-lg`, `shadow-lg`
  - Mobile menu matches navbar padding (`px-4`), full screen overlay


4. Internationalization (i18n)

- Transloco is used for runtime language switching.
- Translation files are split into shared and page-specific JSON:
  - Shared: `src/app/i18n/shared/{en,sv}.json` (header, footer, common strings).
  - Page-specific: e.g. `src/app/pages/home/i18n/{en,sv}.json`.
- `AppTranslocoLoader` (see `src/app/i18n/transloco.config.ts`) merges shared and page-level translations per language.
- Available languages: `['en', 'sv']`. Default language: `sv`.
- When adding a new language:
  - Extend `LANGUAGE_CONFIG` in `LanguageToggleComponent`.
  - Add `shared/<lang>.json` and `<page>/i18n/<lang>.json` files as needed.
  - Update `availableLangs`, `defaultLang`, and `fallbackLang` in `transloco.config.ts` if required.


5. Navigation

- Header (`app-header`):
  - Accepts `backgroundColor` input for dynamic background styling (e.g., `"bg-black/60"` for dimmed overlay, `"bg-outer-space"` for solid background).
  - Embeds `app-language-toggle` in the right-hand social area.
  - Contains both mobile nav and desktop nav as siblings wrapped in a `<div>`
- Mobile menu (`app-mobile-menu`):
  - Full-screen overlay (`fixed inset-0`).
  - Includes `app-language-toggle` below the nav links.

