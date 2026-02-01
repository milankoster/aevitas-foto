import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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

    // If this tag is already the sole active tag, do nothing (keep it active).
    if (activeTags.length === 1 && activeTags[0] === tag) {
      return;
    }

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
