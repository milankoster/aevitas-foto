import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-intro',
  imports: [NgOptimizedImage],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
