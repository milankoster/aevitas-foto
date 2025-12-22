import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { FooterComponent } from '../../components/navigation/footer/footer.component';
import { TranslocoModule } from '@jsverse/transloco';
import { ContactFormComponent } from '../../components/contact/contact-form/contact-form.component';
import { ContactDetailsComponent } from '../../components/contact/contact-details/contact-details.component';
import { FaqComponent } from '../../components/contact/faq/faq.component';

@Component({
  selector: 'app-contact',
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslocoModule,
    ContactFormComponent,
    ContactDetailsComponent,
    FaqComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
