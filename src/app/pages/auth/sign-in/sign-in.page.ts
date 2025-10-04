import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

import { AuthService } from '../../../services/auth.service';
import { DEFAULT_LOCALE } from '../../../configs/locales';
import { LocaleRouterService } from '../../../services/locale-router.service';

@Component({
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './sign-in.page.html',
  styleUrl: './sign-in.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SignInPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly localeRouter = inject(LocaleRouterService);

  readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Save the JWT token or user data as needed
          localStorage.setItem('token', response.jwt);
          this.localeRouter.navigate(['admin', 'dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          // Handle error (e.g., show a message to the user)
        },
      });
    }
  }
}
