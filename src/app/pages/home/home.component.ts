import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {MiniGalleryComponent} from '../../components/mini-gallery/mini-gallery';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, MiniGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {}
