import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { GalleryMasonryComponent } from '../../components/gallery/gallery-masonry/gallery-masonry.component';
import { LightboxService } from '../../components/gallery/lightbox/lightbox.service';
import { GALLERY_IMAGES, GALLERY_TAGS, GalleryImage, GalleryTag } from './gallery-images';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent, HeaderComponent, GalleryMasonryComponent],
})
export class GalleryComponent {
  private readonly lightbox = inject(LightboxService);

  readonly images: readonly GalleryImage[] = GALLERY_IMAGES;
  readonly availableTags: readonly GalleryTag[] = GALLERY_TAGS;
  readonly multiSelect = false;

  activeTags: readonly GalleryTag[] = ['all'];

  filteredImages(): readonly GalleryImage[] {
    const tags = this.activeTags;

    if (!tags || tags.length === 0 || tags.includes('all')) {
      return this.images;
    }

    return this.images.filter((img) => tags.some((t) => img.tags.includes(t)));
  }

  onActiveTagsChange(next: readonly GalleryTag[]): void {
    this.activeTags = next;
  }

  onImageClick(id: GalleryImage['id']): void {
    const list = this.filteredImages();
    this.lightbox.open(list, id);
  }
}
