import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { AboutInfoComponent } from '../../components/about/about-info/about-info.component';
import { AboutReviewsComponent } from '../../components/about/about-reviews/about-reviews.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent, AboutInfoComponent, AboutReviewsComponent, TranslocoModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
