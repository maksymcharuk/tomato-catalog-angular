import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Dispatcher } from '@ngrx/signals/events';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

import { authEvents } from '../../../store/events';
import { SignInPageStore } from './sign-in.page.store';

@Component({
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
  ],
  providers: [SignInPageStore],
  templateUrl: './sign-in.page.html',
  styleUrl: './sign-in.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SignInPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dispatcher = inject(Dispatcher);
  private readonly store = inject(SignInPageStore);

  readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.dispatcher.dispatch(
      authEvents.login({ email: email!, passwork: password! }),
    );
  }
}
