import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-mini-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-gallery.component.html',
  styleUrls: ['./mini-gallery.component.css'],
})
export class MiniGalleryComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.mini-gallery', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      centeredSlides: false,
      loop: false,
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      pagination: { el: '.swiper-pagination', clickable: true },
      observer: true,
      observeParents: true,
    });
  }
}
