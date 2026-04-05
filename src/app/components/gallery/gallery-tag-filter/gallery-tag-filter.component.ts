import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryTag } from '../../../pages/gallery/images/gallery-images';
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

  readonly activeTagsChange = output<readonly GalleryTag[]>();

  /** Convenience: name of the special "all" tag if present. */
  private readonly allTag = computed<GalleryTag | undefined>(() => {
    const tags = this.availableTags();
    return (tags.find((t) => t === 'all') as GalleryTag | undefined) ?? undefined;
  });

  toggle(tag: GalleryTag): void {
    const activeTags = this.activeTags();
    const allTag = this.allTag();

    if (allTag && tag === allTag) {
      this.activeTagsChange.emit([allTag]);
      return;
    }

    // If the clicked tag is already active, toggle it off. When toggling
    // off a non-`all` tag we want to fall back to the `all` tag (if present),
    // otherwise emit an empty array.
    if (activeTags.length === 1 && activeTags[0] === tag) {
      if (allTag) {
        this.activeTagsChange.emit([allTag]);
      } else {
        this.activeTagsChange.emit([]);
      }
      return;
    }

    // Otherwise select the clicked tag as the sole active tag.
    this.activeTagsChange.emit([tag]);
  }

  isActive(tag: GalleryTag): boolean {
    const allTag = this.allTag();
    const active = this.activeTags();

    if ((active.length === 0 || !active.some((t) => t !== allTag)) && allTag && tag === allTag) {
      return true;
    }

    return active.includes(tag);
  }
}
