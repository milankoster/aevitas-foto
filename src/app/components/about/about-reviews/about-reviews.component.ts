import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autoplay, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';

Swiper.use([Pagination, Autoplay]);

type Review = {
  name: string;
  quote: string;
};

@Component({
  selector: 'app-about-reviews',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './about-reviews.component.html',
  styleUrl: './about-reviews.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutReviewsComponent implements AfterViewInit, OnDestroy {
  private translocoService = inject(TranslocoService);

  // Using a signal so the template can react when translations are loaded/updated
  readonly reviews = signal<Review[]>([]);
  private reviewsSub?: Subscription;
  private swiperInstance?: Swiper;
  private viewInitialized = false;

  constructor() {
    this.reviewsSub = this.translocoService.selectTranslateObject('reviews').subscribe((arr: unknown) => {
      const list = Array.isArray(arr) ? (arr as Review[]) : [];
      this.reviews.set(list);
      if (this.viewInitialized) {
        if (this.swiperInstance) {
          // schedule in next tick to let DOM update
          setTimeout(() => this.swiperInstance?.update(), 0);
        } else if (list.length > 0) {
          // create swiper after DOM updates
          setTimeout(() => this.createSwiper(), 0);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.reviews().length > 0) {
      this.createSwiper();
    }
  }

  private createSwiper(): void {
    if (this.swiperInstance) {
      return;
    }
    this.swiperInstance = new Swiper('.reviews-swiper', {
      spaceBetween: 24,
      centeredSlides: false,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      observer: true,
      observeParents: true,
      watchOverflow: true,
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      },
    });
  }

  ngOnDestroy(): void {
    this.reviewsSub?.unsubscribe();
    this.swiperInstance?.destroy(true, true);
  }
}
