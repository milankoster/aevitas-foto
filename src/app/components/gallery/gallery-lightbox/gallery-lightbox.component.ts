import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import Swiper from 'swiper';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { GalleryImage } from '../../../pages/gallery/gallery-images';

Swiper.use([Navigation, Pagination, Keyboard]);

type ImageId = GalleryImage['id'];

type SwiperLike = {
  slideNext: () => void;
  slidePrev: () => void;
  slideToLoop: (index: number, speed?: number) => void;
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  activeIndex: number;
  realIndex: number;
  on: (event: string, cb: () => void) => void;
};

@Component({
  selector: 'app-gallery-lightbox',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NgOptimizedImage],
  templateUrl: './gallery-lightbox.component.html',
  styleUrl: './gallery-lightbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLightboxComponent implements OnDestroy {
  readonly open = input(false);
  readonly images = input<readonly GalleryImage[]>([]);
  readonly activeId = input<ImageId | null>(null);

  /** Close the modal */
  readonly closed = output<void>();

  /** Optional: keep parent in sync with current slide */
  readonly activeIdChange = output<ImageId>();

  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly dialogRef = viewChild.required<ElementRef<HTMLElement>>('dialog');

  private swiper?: SwiperLike;
  private lastFocusedElement?: HTMLElement;

  /** Prevent slideChange -> activeIdChange -> parent update -> slideToLoop -> slideChange loops. */
  private suppressSlideChangeEmit = false;

  private lastEmittedActiveId: ImageId | null = null;

  readonly initialIndex = computed(() => {
    const id = this.activeId();
    if (id === null) {
      return 0;
    }
    const index = this.images().findIndex((i) => i.id === id);
    return index >= 0 ? index : 0;
  });

  readonly canRender = computed(() => this.open());

  constructor() {
    // Re-init swiper when opened, and keep slide aligned with activeId/images.
    effect(() => {
      const open = this.open();
      const images = this.images();
      const index = this.initialIndex();

      if (!open || images.length === 0) {
        this.destroySwiper();
        return;
      }

      queueMicrotask(() => this.initSwiper(index));
    });

    // Focus management.
    effect(() => {
      if (typeof document === 'undefined') {
        return;
      }

      if (this.open()) {
        this.lastFocusedElement = document.activeElement as HTMLElement | undefined;
        queueMicrotask(() => this.focusDialog());
      } else {
        this.restoreFocus();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySwiper();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.requestClose();
      return;
    }

    // If Swiper keyboard is disabled for some reason, keep arrows working.
    if (event.key === 'ArrowLeft') {
      this.swiper?.slidePrev();
    }

    if (event.key === 'ArrowRight') {
      this.swiper?.slideNext();
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  onBackdropClick(event: MouseEvent): void {
    // Only close if the click is on the backdrop itself, not inside the dialog.
    if (event.target === event.currentTarget) {
      this.requestClose();
    }
  }

  requestClose(): void {
    this.closed.emit();
  }

  translateAlt(image: GalleryImage): string {
    const key = image.altKey;
    const value = this.transloco.translate(key);
    return value && value !== key ? value : 'Gallery image';
  }

  private initSwiper(initialIndex: number): void {
    if (this.swiper) {
      // Keep in sync if the parent changes activeId while open.
      // Only move if we're not already on the requested real index.
      if (this.swiper.realIndex !== initialIndex) {
        this.suppressSlideChangeEmit = true;
        this.swiper.slideToLoop(initialIndex, 0);
        // Release on next microtask, after Swiper dispatches its internal events.
        queueMicrotask(() => {
          this.suppressSlideChangeEmit = false;
        });
      }
      return;
    }

    const root = this.dialogRef().nativeElement;

    const swiperEl = root.querySelector('.gallery-lightbox-swiper') as HTMLElement | null;
    if (!swiperEl) {
      return;
    }

    const swiper = new Swiper(swiperEl, {
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
      initialSlide: initialIndex,
      navigation: {
        nextEl: root.querySelector('.swiper-button-next') as HTMLElement,
        prevEl: root.querySelector('.swiper-button-prev') as HTMLElement,
        disabledClass: 'swiper-button-disabled',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      observer: true,
      observeParents: true,
      watchOverflow: true,
    }) as unknown as SwiperLike;

    swiper.on('slideChange', () => {
      if (this.suppressSlideChangeEmit) {
        return;
      }

      const images = this.images();
      const idx = swiper.realIndex;
      const img = images[idx];

      if (!img) {
        return;
      }

      // Dedupe emits (Swiper can fire multiple slideChange events during loop adjustments).
      if (this.lastEmittedActiveId === img.id) {
        return;
      }

      this.lastEmittedActiveId = img.id;
      this.activeIdChange.emit(img.id);
    });

    this.swiper = swiper;

    // Initialize emit state so the first slideChange doesn't bounce back.
    const initial = this.images()[swiper.realIndex];
    this.lastEmittedActiveId = initial?.id ?? null;
  }

  private destroySwiper(): void {
    if (!this.swiper) {
      return;
    }

    try {
      this.swiper.destroy(true, true);
    } finally {
      this.swiper = undefined;
      this.suppressSlideChangeEmit = false;
      this.lastEmittedActiveId = null;
    }
  }

  private focusDialog(): void {
    const dialog = this.dialogRef().nativeElement;

    const focusables = this.getFocusableElements(dialog);
    const target = focusables[0] ?? dialog;

    if (!dialog.hasAttribute('tabindex')) {
      dialog.setAttribute('tabindex', '-1');
    }

    target.focus();
  }

  private restoreFocus(): void {
    this.lastFocusedElement?.focus?.();
    this.lastFocusedElement = undefined;
  }

  private trapFocus(event: KeyboardEvent): void {
    const dialog = this.dialogRef().nativeElement;

    const focusables = this.getFocusableElements(dialog);
    if (focusables.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last.focus();
    }
  }

  private getFocusableElements(root: HTMLElement): HTMLElement[] {
    const selectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
  }
}
