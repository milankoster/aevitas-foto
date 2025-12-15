import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-banner-mobile',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, TranslocoModule],
  templateUrl: './banner-mobile.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerMobileComponent {}
