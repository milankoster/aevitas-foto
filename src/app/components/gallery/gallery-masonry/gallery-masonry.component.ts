import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { ShuffleOptions } from 'shufflejs';
import { GalleryImage, GalleryTag } from '../../../pages/gallery/gallery-images';

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
  imports: [NgOptimizedImage],
  templateUrl: './gallery-masonry.component.html',
  styleUrl: './gallery-masonry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryMasonryComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) images: readonly GalleryImage[] = [];
  @Input() availableTags: readonly GalleryTag[] = [];

  /** Default: single-select (per plan). */
  @Input() multiSelect = false;

  @Input() activeTags: readonly GalleryTag[] = [];
  @Output() readonly activeTagsChange = new EventEmitter<readonly GalleryTag[]>();

  @Output() readonly imageClick = new EventEmitter<ImageId>();

  @ViewChild('grid', { static: true }) private readonly gridRef!: ElementRef<HTMLElement>;

  private Shuffle?: ShuffleCtor & ShuffleStatic;
  private shuffle?: InstanceType<ShuffleCtor>;

  async ngAfterViewInit(): Promise<void> {
    await this.initShuffle();
    this.applyFilter();

    // First layout pass after initial render.
    queueMicrotask(() => this.shuffle?.layout());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTags'] && this.shuffle) {
      this.applyFilter();
    }

    if (changes['images'] && !changes['images'].firstChange && this.shuffle) {
      // Let Angular render new DOM then force Shuffle to re-measure.
      queueMicrotask(() => {
        this.shuffle?.resetItems();
        this.shuffle?.layout();
        this.applyFilter();
      });
    }
  }

  ngOnDestroy(): void {
    this.shuffle?.destroy();
    this.shuffle = undefined;
  }

  onTagToggle(tag: GalleryTag): void {
    const currentlyActive = new Set(this.activeTags);

    if (this.multiSelect) {
      if (currentlyActive.has(tag)) {
        currentlyActive.delete(tag);
      } else {
        currentlyActive.add(tag);
      }
      this.activeTagsChange.emit(Array.from(currentlyActive));
      return;
    }

    // Single-select
    if (this.activeTags.length === 1 && this.activeTags[0] === tag) {
      this.activeTagsChange.emit([]);
      return;
    }

    this.activeTagsChange.emit([tag]);
  }

  onImageLoad(): void {
    // Layout after images load to reduce overlap.
    this.shuffle?.layout();
  }

  private async initShuffle(): Promise<void> {
    // If the template hasn't rendered the grid for some reason, bail safely.
    if (!this.gridRef?.nativeElement) {
      return;
    }

    // Lazy-load to avoid any SSR/bundler/ESM interop issues.
    const mod = (await import('shufflejs')) as unknown as {
      default?: ShuffleCtor & ShuffleStatic;
    };
    const Shuffle = (mod.default ?? (mod as unknown)) as ShuffleCtor & ShuffleStatic;
    this.Shuffle = Shuffle;

    this.shuffle = new Shuffle(this.gridRef.nativeElement, {
      itemSelector: '.gallery-item',
      sizer: '.gallery-sizer',
      buffer: 1,
    });
  }

  private applyFilter(): void {
    const tags = this.activeTags;
    const shuffle = this.shuffle;
    const Shuffle = this.Shuffle;

    if (!shuffle || !Shuffle) {
      return;
    }

    if (!tags || tags.length === 0) {
      shuffle.filter(Shuffle.ALL_ITEMS);
      return;
    }

    // Multi-select uses OR semantics by default.
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

  getAspectRatio(image: GalleryImage): string {
    return `${image.width} / ${image.height}`;
  }
}
