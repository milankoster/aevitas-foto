import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MiniGalleryComponent } from '../../components/home/mini-gallery/mini-gallery.component';
import { HeroComponent } from '../../components/home/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [MiniGalleryComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
