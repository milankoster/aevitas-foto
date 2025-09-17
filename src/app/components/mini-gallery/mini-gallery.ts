import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-mini-gallery',
  standalone: true,
  templateUrl: './mini-gallery.component.html',
  styleUrl: './mini-gallery.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniGalleryComponent {}
