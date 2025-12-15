import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-intro',
  imports: [NgOptimizedImage, RouterLink, TranslocoModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
