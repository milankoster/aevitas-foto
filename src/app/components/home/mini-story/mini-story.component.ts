import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mini-story',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './mini-story.component.html',
  styleUrls: ['./mini-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniStoryComponent {}
