import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { IntroComponent } from '../../components/home/intro/intro.component';
import { MiniGalleryComponent } from '../../components/home/mini-gallery/mini-gallery.component';
import { BannerComponent } from '../../components/home/banner/banner.component';
import { BannerMobileComponent } from '../../components/home/banner/banner-mobile.component';
import { FooterComponent } from '../../components/navigation/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    IntroComponent,
    MiniGalleryComponent,
    BannerComponent,
    BannerMobileComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
