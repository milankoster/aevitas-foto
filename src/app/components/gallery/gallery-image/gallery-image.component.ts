import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { buildGallerySrc, GALLERY_WIDTHS, GalleryImage } from '../../../pages/gallery/images/gallery-images';

type ImageId = GalleryImage['id'];

@Component({
  selector: 'app-gallery-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslocoModule],
  templateUrl: './gallery-image.component.html',
  styleUrl: './gallery-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryImageComponent {
  readonly image = input.required<GalleryImage>();

  /** Emitted when the underlying <img> fires a load event (useful to re-layout masonry). */
  readonly imageLoad = output<void>();

  /** Emitted when the figure/button is clicked. */
  readonly imageClick = output<ImageId>();

  /** Used to fade the image in once it's fully loaded (prevents alt-text flash). */
  loaded = false;

  private readonly transloco = inject(TranslocoService);

  readonly altText = computed(() => {
    const keyPart = this.image().path;
    const fullKey = `galleryDescriptions.images.${keyPart}.alt`;
    const value = this.transloco.translate(fullKey);
    if (value) {
      return value;
    }

    const defaultKey = 'gallery.defaultImageDescription';
    return this.transloco.translate(defaultKey);
  });

  /** Smallest variant is used as the placeholder src for NgOptimizedImage. */
  readonly placeholderSrc = computed(() => {
    const img = this.image();
    const smallest = GALLERY_WIDTHS[0];
    return buildGallerySrc(img, smallest);
  });

  /** srcset covering all configured widths. */
  readonly srcset = computed(() => {
    const img = this.image();
    return GALLERY_WIDTHS.map((w) => `${buildGallerySrc(img, w)} ${w}w`).join(', ');
  });

  onClick(): void {
    this.imageClick.emit(this.image().id);
  }

  onLoad(): void {
    this.loaded = true;
    this.imageLoad.emit();
  }
}
