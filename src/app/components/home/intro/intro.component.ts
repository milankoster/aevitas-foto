import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-intro',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
