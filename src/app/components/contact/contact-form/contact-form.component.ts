import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);

  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);
  readonly submitError = signal(false);

  contactForm: FormGroup;

  // International phone pattern: allows +, digits, spaces, dashes, parentheses
  private phonePattern = /^\+?[0-9\s\-()]+$/;

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(this.phonePattern), Validators.minLength(8), Validators.maxLength(20)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSubmitting()) {
      // Mark all fields as touched to show validation errors
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(false);

    const formData = this.contactForm.value;

    this.emailService.sendContactForm(formData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);

        // Clear form after 2 seconds
        setTimeout(() => {
          this.contactForm.reset();
          this.submitSuccess.set(false);
        }, 2000);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitError.set(true);

        // Hide error after 5 seconds
        setTimeout(() => {
          this.submitError.set(false);
        }, 5000);
      },
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.contactForm.get(fieldName);

    if (!field || !field.touched || !field.errors) {
      return null;
    }

    if (field.errors['required']) {
      return 'form.errors.required';
    }
    if (field.errors['email']) {
      return 'form.errors.invalidEmail';
    }
    if (field.errors['pattern']) {
      return 'form.errors.invalidPhone';
    }
    if (field.errors['minLength']) {
      return 'form.errors.tooShort';
    }
    if (field.errors['maxLength']) {
      return 'form.errors.tooLong';
    }

    return null;
  }
}
