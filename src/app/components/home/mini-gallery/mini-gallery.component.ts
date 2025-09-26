import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-mini-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './mini-gallery.component.html',
  styleUrls: ['./mini-gallery.component.css'],
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
        1024: { slidesPerView: 3 },
      },
    });
  }
}
