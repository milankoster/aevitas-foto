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
  viewChild,
} from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import Swiper, { type Swiper as SwiperInstance } from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';

import { buildGallerySrc, GALLERY_WIDTHS, GalleryImage } from '../../../pages/gallery/images/gallery-images';
import { LightboxService } from './lightbox.service';
import { LIGHTBOX_DATA } from './lightbox.tokens';

Swiper.use([Navigation, Keyboard]);

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NgOptimizedImage],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent {
  private readonly data = inject(LIGHTBOX_DATA);
  private readonly lightbox = inject(LightboxService);
  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly dialogRef = viewChild.required<ElementRef<HTMLElement>>('dialog');

  readonly images = this.data.images;

  // Build src for a given image at a specific width.
  readonly srcFor = (image: GalleryImage, width: number): string =>
    buildGallerySrc(image, width as (typeof GALLERY_WIDTHS)[number]);

  // Build srcset string for a given image using all configured widths.
  readonly srcsetFor = (image: GalleryImage): string =>
    GALLERY_WIDTHS.map((w) => `${buildGallerySrc(image, w)} ${w}w`).join(', ');

  readonly initialIndex = computed(() => {
    const idx = this.images.findIndex((i) => i.id === this.data.initialActiveId);
    return idx >= 0 ? idx : 0;
  });

  private swiper?: SwiperInstance;

  constructor() {
    effect(() => {
      const idx = this.initialIndex();
      queueMicrotask(() => this.initSwiper(idx));
    });

    queueMicrotask(() => this.dialogRef().nativeElement.focus());

    this.destroyRef.onDestroy(() => this.destroySwiper());
  }

  close(): void {
    this.lightbox.close();
  }

  next(): void {
    this.swiper?.slideNext();
  }

  prev(): void {
    this.swiper?.slidePrev();
  }

  translateAlt(image: GalleryImage): string {
    const key = image.altKey;
    const value = this.transloco.translate(key);
    return value && value !== key ? value : 'Gallery image';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }

    if (event.key === 'ArrowLeft') {
      this.prev();
    }

    if (event.key === 'ArrowRight') {
      this.next();
    }
  }

  onBackgroundClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const tag = target.tagName;
    if (tag === 'BUTTON' || tag === 'IMG' || tag === 'I') {
      return;
    }

    this.close();
  }

  private initSwiper(initialIndex: number): void {
    if (this.swiper) {
      if (this.swiper.realIndex !== initialIndex) {
        this.swiper.slideToLoop(initialIndex, 0);
      }
      return;
    }

    const root = this.dialogRef().nativeElement;

    const swiperEl = root.querySelector('.lightbox-swiper') as HTMLElement | null;
    if (!swiperEl) {
      return;
    }

    this.swiper = new Swiper(swiperEl, {
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
    });
  }

  private destroySwiper(): void {
    this.swiper?.destroy(true, true);
    this.swiper = undefined;
  }
}
