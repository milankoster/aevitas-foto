import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import { TranslocoModule } from '@jsverse/transloco';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-mini-gallery',
  imports: [CommonModule, NgOptimizedImage, TranslocoModule],
  templateUrl: './mini-gallery.component.html',
  styleUrls: ['./mini-gallery.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniGalleryComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.mini-gallery', {
      spaceBetween: 16,
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
        480: { slidesPerView: 2 },
        800: { slidesPerView: 3 },
        1800: { slidesPerView: 4 },
        2560: { slidesPerView: 5 },
      },
    });
  }
}
