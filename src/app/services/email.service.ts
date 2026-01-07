import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

export type FormspreeResponse = {
  ok: boolean;
  next?: string;
};

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly http = inject(HttpClient);
  private readonly formspreeUrl = `${environment.formspreeEndpoint}`;

  sendContactForm(data: ContactFormData): Observable<FormspreeResponse> {
    const mappedData = {
      'First Name': data.firstName,
      'Last Name': data.lastName,
      'E-mail': data.email,
      Phone: data.phone,
      Message: data.message,
    };
    return this.http.post<FormspreeResponse>(this.formspreeUrl, mappedData);
  }
}
