import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ShuffleOptions } from 'shufflejs';
import { GalleryImage, GalleryTag } from '../../../pages/gallery/gallery-images';
import { GalleryTagFilterComponent } from '../gallery-tag-filter/gallery-tag-filter.component';
import { GalleryImageComponent } from '../gallery-image/gallery-image.component';
import { TranslocoModule } from '@jsverse/transloco';

type ImageId = GalleryImage['id'];

type ShuffleFilter = unknown;

type ShuffleCtor = new (
  element: Element,
  options?: ShuffleOptions,
) => {
  filter: (filter: ShuffleFilter) => void;
  resetItems: () => void;
  layout: () => void;
  destroy: () => void;
};

type ShuffleStatic = {
  /** Shuffle uses a special constant for "show all". We keep it loosely typed to avoid UMD typing issues. */
  ALL_ITEMS: unknown;
};

@Component({
  selector: 'app-gallery-masonry',
  standalone: true,
  imports: [CommonModule, GalleryTagFilterComponent, GalleryImageComponent, TranslocoModule],
  templateUrl: './gallery-masonry.component.html',
  styleUrl: './gallery-masonry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryMasonryComponent implements AfterViewInit, OnDestroy {
  readonly images = input.required<readonly GalleryImage[]>();
  readonly availableTags = input<readonly GalleryTag[]>([]);

  /** Default: single-select (per plan). */
  readonly multiSelect = input(false);

  readonly activeTags = input<readonly GalleryTag[]>([]);
  readonly activeTagsChange = output<readonly GalleryTag[]>();

  readonly imageClick = output<ImageId>();

  private readonly gridRef = viewChild.required<ElementRef<HTMLElement>>('grid');

  private Shuffle?: ShuffleCtor & ShuffleStatic;
  private shuffle?: InstanceType<ShuffleCtor>;

  constructor() {
    effect(() => {
      void this.activeTags();
      if (this.shuffle) {
        this.applyFilter();
      }
    });

    effect(() => {
      void this.images();
      if (this.shuffle) {
        queueMicrotask(() => {
          this.shuffle?.resetItems();
          this.shuffle?.layout();
          this.applyFilter();
        });
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.initShuffle();
    this.applyFilter();

    // First layout pass after initial render.
    queueMicrotask(() => this.shuffle?.layout());

    // Follow-up layouts for Safari/aspect-ratio + deferred image rendering.
    requestAnimationFrame(() => this.shuffle?.layout());
    setTimeout(() => this.shuffle?.layout(), 200);
  }

  ngOnDestroy(): void {
    this.shuffle?.destroy();
    this.shuffle = undefined;
  }

  onImageLoad(): void {
    this.shuffle?.layout();
  }

  private async initShuffle(): Promise<void> {
    const grid = this.gridRef().nativeElement;

    // Lazy-load to avoid any SSR/bundler/ESM interop issues.
    const mod = (await import('shufflejs')) as unknown as {
      default?: ShuffleCtor & ShuffleStatic;
    };
    const Shuffle = (mod.default ?? (mod as unknown)) as ShuffleCtor & ShuffleStatic;
    this.Shuffle = Shuffle;

    this.shuffle = new Shuffle(grid, {
      itemSelector: '.gallery-item',
      sizer: '.gallery-sizer',
      buffer: 1,
    });
  }

  private applyFilter(): void {
    const tags = this.activeTags();
    const shuffle = this.shuffle;
    const Shuffle = this.Shuffle;

    if (!shuffle || !Shuffle) {
      return;
    }

    // Explicit "all" tag: always show everything.
    if (!tags || tags.length === 0 || tags.includes('all')) {
      shuffle.filter(Shuffle.ALL_ITEMS);
      return;
    }

    shuffle.filter((element: Element) => {
      const groupsRaw = element.getAttribute('data-groups');
      if (!groupsRaw) {
        return false;
      }

      let groups: readonly string[] = [];
      try {
        groups = JSON.parse(groupsRaw) as readonly string[];
      } catch {
        return false;
      }

      return tags.some((t) => groups.includes(t));
    });
  }
}
