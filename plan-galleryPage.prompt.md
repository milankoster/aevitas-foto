## Plan: Gallery Page – Masonry Grid with Lightbox Carousel

A modern, responsive gallery page using a masonry grid (no straight horizontal lines), with interactive image viewing
and brand-aligned styling. All images and tags are managed via a JSON file or TypeScript array for easy updates.

### Steps

1. **Create Image Data Source**

[X] Add a JSON file (e.g., `gallery-images.json`) in `/assets` or a TypeScript file in `/src/app/pages/gallery/` with
image URLs and tags.
[X] Example: `[{"src": "...", "alt": "...", "tags": ["dogs", "outdoor"]}, ...]`

2. **Build Masonry Grid Component (using Shuffle.js)**

[X] Use Shuffle.js for a responsive masonry layout with animated transitions for filtering and reordering.
[X] No straight horizontal lines: keep consistent column widths (clear vertical gutters), but let each image keep its
natural aspect ratio so tile heights vary and rows don’t align.
[X] Each image uses lazy loading and a fade-in + scale-up animation on load. This only appears on load, not before.
[X] The images should take up about 90% of the page's width and be centred.
[X] When filtering, animate images so they “slide” smoothly to new positions (Shuffle.js handles this out of the box).
[X] Tag filter supports both single and multi-select (default to single-select)
[X] Refactor gallery components.
[X] All images have alt text with translations.

3. **Create a lightbox modal that functions as full-screen overlay screen (Swiper + Angular CDK Overlay)**

[X] Use Swiper for the image carousel functionality, as in the mini-gallery component.
[X] Use Angular CDK `Overlay` so the lightbox renders outside the gallery DOM and can fully control its own layout.
[X] Show the image in a centered carousel with left/right carots for navigation.
[X] Lightbox opens on the correct image that was clicked.
[X] Integrates with the tag filter (only shows images matching current filters).
[X] When the lightbox closes, return to the gallery with the same scroll position and active filters.
[X] Alt texts including translations, stored alongside images.
[X] Scroll should remain enabled in the background when the overlay is open.
[X] Top-right actions: Close button.
[X] Keyboard navigation: arrows for next/prev, Esc to close
[X] Compatible with desktop
[X] Compatible with phone
[X] Slight rounding of images in the lightbox.
[X] Compatible on all screen sizes.
[X] Clicking outside the image (on dim layer) closes the overlay.
[X] Tab focus

4. **Add Tag Filtering**

[X] Display tags as clickable buttons/ 23chips above the grid.
[X] Clicking a tag filters the grid to matching images.
[X] Support both single-select and multi-select.
[X] Use brand colors for active/inactive tags.
[X] All tag that shows all images (default state).
[X] Translations.

5. **Styling & Responsiveness**

[X] Use page-root wrapper.
[X] Gallery title and filters according to the website's styles, centred
[X] Match home page gallery styles
[X] Default to all when no filter is selected
[] Fix console errors/warnings.
[] Add a banner / intro section

6. ** Finishing Touches**

[] Use real images provided by Caeli.
[] Optimize images for web (compression, responsive sizes).
    
