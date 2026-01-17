import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryTag } from '../../../pages/gallery/gallery-images';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-gallery-tag-filter',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './gallery-tag-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryTagFilterComponent {
  readonly availableTags = input<readonly GalleryTag[]>([]);
  readonly activeTags = input<readonly GalleryTag[]>([]);

  /** Default: single-select. */
  readonly multiSelect = input(false);

  readonly activeTagsChange = output<readonly GalleryTag[]>();

  toggle(tag: GalleryTag): void {
    const activeTags = this.activeTags();
    const set = new Set(activeTags);

    if (this.multiSelect()) {
      if (set.has(tag)) {
        set.delete(tag);
      } else {
        set.add(tag);
      }
      this.activeTagsChange.emit(Array.from(set));
      return;
    }

    // Single-select
    if (activeTags.length === 1 && activeTags[0] === tag) {
      this.activeTagsChange.emit([]);
      return;
    }

    this.activeTagsChange.emit([tag]);
  }

  isActive(tag: GalleryTag): boolean {
    return this.activeTags().includes(tag);
  }
}
