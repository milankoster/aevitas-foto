import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { GalleryImage } from '../../../pages/gallery/gallery-images';

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
    const key = this.image().altKey;
    const value = this.transloco.translate(key);
    return value && value !== key ? value : 'Gallery image';
  });

  onClick(): void {
    this.imageClick.emit(this.image().id);
  }

  onLoad(): void {
    this.loaded = true;
    this.imageLoad.emit();
  }
}
