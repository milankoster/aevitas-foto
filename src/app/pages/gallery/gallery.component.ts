import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent, HeaderComponent],
})
export class GalleryComponent {}
