import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { GALLERY_IMAGES, GALLERY_TAGS, GalleryImage, GalleryTag } from './gallery-images';
import { GalleryMasonryComponent } from './components/gallery-masonry/gallery-masonry.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent, HeaderComponent, GalleryMasonryComponent],
})
export class GalleryComponent {
  readonly images: readonly GalleryImage[] = GALLERY_IMAGES;

  readonly availableTags: readonly GalleryTag[] = GALLERY_TAGS;

  readonly multiSelect = false;
  activeTags: readonly GalleryTag[] = [];

  onActiveTagsChange(next: readonly GalleryTag[]): void {
    this.activeTags = next;
  }

  onImageClick(id: GalleryImage['id']): void {
    // Step 3 will implement the Swiper lightbox + deep linking.
    // Keeping `id` here so the template contract is stable.
    void id;
  }
}
