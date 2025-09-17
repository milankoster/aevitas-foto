import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
