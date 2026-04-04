import { AfterViewInit, ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { inject } from '@angular/core';

Swiper.use([Navigation, Pagination]);

interface Review {
  name: string;
  quote: string;
}

@Component({
  selector: 'app-about-reviews',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './about-reviews.component.html',
  styleUrl: './about-reviews.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutReviewsComponent implements AfterViewInit {
  private translocoService = inject(TranslocoService);

  reviews = computed(() => {
    const reviewsData = this.translocoService.translate('reviews');
    return Array.isArray(reviewsData) ? reviewsData as Review[] : [];
  });

  ngAfterViewInit(): void {
    new Swiper('.reviews-swiper', {
      spaceBetween: 24,
      centeredSlides: false,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'swiper-button-disabled',
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
}


