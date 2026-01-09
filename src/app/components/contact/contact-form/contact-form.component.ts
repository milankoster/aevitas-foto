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
  readonly formSubmitted = signal(false);

  contactForm: FormGroup;

  // International phone pattern: allows +, digits, spaces, dashes, parentheses
  private phonePattern = /^\+?[0-9\s\-()]+$/;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      petNames: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(this.phonePattern), Validators.minLength(8), Validators.maxLength(20)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  onSubmit(): void {
    this.formSubmitted.set(true);

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
        this.contactForm.reset();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitError.set(true);
      },
    });
  }

  dismissSuccess(): void {
    this.submitSuccess.set(false);
    this.formSubmitted.set(false);
    // Reset the form's touched state to prevent validation errors on cleared fields
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contactForm.get(key)?.markAsUntouched();
    });
  }

  dismissError(): void {
    this.submitError.set(false);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.contactForm.get(fieldName);

    if (!field || !field.errors) {
      return null;
    }

    // Don't show errors if the field is currently focused
    const activeElement = document.activeElement;
    const fieldElement = document.getElementById(fieldName);
    if (activeElement === fieldElement) {
      return null;
    }

    // For minlength/maxlength errors, only show after field is touched (blur)
    // Never show these errors just because form was submitted
    const isLengthError = field.errors['minlength'] || field.errors['maxlength'];
    if (isLengthError && !field.touched) {
      return null;
    }

    // For email validation errors, only show after field is touched (blur)
    const isEmailError = field.errors['email'];
    if (isEmailError && !field.touched) {
      return null;
    }

    // For other errors (required, pattern), show if field is touched/dirty
    // Don't show immediately after form submission
    if (!field.touched && !field.dirty) {
      return null;
    }

    if (field.errors['required']) {
      return `${fieldName}.errors.required`;
    }
    if (field.errors['email']) {
      return `${fieldName}.errors.invalidEmail`;
    }
    if (field.errors['pattern']) {
      return `${fieldName}.errors.invalidPhone`;
    }
    if (field.errors['minlength']) {
      return `${fieldName}.errors.tooShort`;
    }
    if (field.errors['maxlength']) {
      return `${fieldName}.errors.tooLong`;
    }

    return null;
  }
}
