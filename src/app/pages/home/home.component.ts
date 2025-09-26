import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { IntroComponent } from '../../components/home/intro/intro.component';
import { MiniGalleryComponent } from '../../components/home/mini-gallery/mini-gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, IntroComponent, MiniGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
