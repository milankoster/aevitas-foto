import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MiniGalleryComponent } from '../../components/mini-gallery/mini-gallery.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, MiniGalleryComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
