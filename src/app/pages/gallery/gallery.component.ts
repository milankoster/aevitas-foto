import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { GalleryLightboxComponent } from '../../components/gallery/gallery-lightbox/gallery-lightbox.component';
import { GalleryMasonryComponent } from '../../components/gallery/gallery-masonry/gallery-masonry.component';
import { GALLERY_IMAGES, GALLERY_TAGS, GalleryImage, GalleryTag } from './gallery-images';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent, HeaderComponent, GalleryLightboxComponent, GalleryMasonryComponent],
})
export class GalleryComponent {
  readonly images: readonly GalleryImage[] = GALLERY_IMAGES;
  readonly availableTags: readonly GalleryTag[] = GALLERY_TAGS;
  readonly multiSelect = false;

  activeTags: readonly GalleryTag[] = ['all'];
  activeImageId: GalleryImage['id'] | null = null;
  lightboxOpen = false;

  filteredImages(): readonly GalleryImage[] {
    const tags = this.activeTags;

    if (!tags || tags.length === 0 || tags.includes('all')) {
      return this.images;
    }

    return this.images.filter((img) => tags.some((t) => img.tags.includes(t)));
  }

  onActiveTagsChange(next: readonly GalleryTag[]): void {
    this.activeTags = next;

    // Keep lightbox consistent with the active filters.
    if (!this.lightboxOpen) {
      return;
    }

    const list = this.filteredImages();
    this.activeImageId = list[0].id;
  }

  onImageClick(id: GalleryImage['id']): void {
    this.activeImageId = id;
    this.lightboxOpen = true;
  }

  onLightboxActiveIdChange(id: GalleryImage['id']): void {
    if (this.activeImageId === id) {
      return;
    }

    this.activeImageId = id;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.activeImageId = null;
  }
}
