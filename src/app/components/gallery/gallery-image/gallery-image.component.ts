import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GalleryImage } from '../../../pages/gallery/gallery-images';

type ImageId = GalleryImage['id'];

@Component({
  selector: 'app-gallery-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
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

  onClick(): void {
    this.imageClick.emit(this.image().id);
  }

  onLoad(): void {
    this.loaded = true;
    this.imageLoad.emit();
  }
}
