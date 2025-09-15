import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {MiniGalleryComponent} from '../../components/mini-gallery/mini-gallery';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, MiniGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {}
