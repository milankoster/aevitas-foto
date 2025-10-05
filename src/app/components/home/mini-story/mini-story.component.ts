import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-story.component.html',
  styleUrls: ['./mini-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniStoryComponent {}
