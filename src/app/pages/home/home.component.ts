import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MiniGalleryComponent } from '../../components/mini-gallery/mini-gallery.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, MiniGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
