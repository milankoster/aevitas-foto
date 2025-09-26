import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../navigation/header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [HeaderComponent, NgOptimizedImage, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
