import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-about-info',
  imports: [NgOptimizedImage, TranslocoModule],
  templateUrl: './about-info.component.html',
  styleUrl: './about-info.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutInfoComponent {
  activeTab = signal<string>('about');

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }
}

