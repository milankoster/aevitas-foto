import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-contact-main',
  standalone: true,
  imports: [ContactFormComponent, ContactDetailsComponent],
  templateUrl: './contact-main.component.html',
  styleUrl: './contact-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMainComponent {}
