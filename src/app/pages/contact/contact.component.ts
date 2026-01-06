import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { TranslocoModule } from '@jsverse/transloco';
import { FaqComponent } from '../../components/contact/faq/faq.component';
import { ContactTitleComponent } from '../../components/contact/contact-title/contact-title.component';
import { ContactMainComponent } from '../../components/contact/contact-main/contact-main.component';

@Component({
  selector: 'app-contact',
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslocoModule,
    FaqComponent,
    ContactTitleComponent,
    ContactMainComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
