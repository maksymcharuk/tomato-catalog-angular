import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

import { Tomato } from '../../api/tomatoes';

import { TomatoFormStore } from './tomato-form.component.state';
import { LocaleService } from '../../services/locale.service';
import { tomatoesEvents } from '../../store/events';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    FileUploadModule,
    ButtonModule,
    TextareaModule,
    InputNumberModule,
    CheckboxModule,
  ],
  providers: [TomatoFormStore],
  selector: 'tomato-form',
  templateUrl: './tomato-form.component.html',
  styleUrl: './tomato-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(TomatoFormStore);
  private readonly dispatcher = inject(Dispatcher);
  readonly localeService = inject(LocaleService);

  readonly tomato = input<Tomato | null>(null);

  readonly form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    price: this.fb.control(0),
    description: this.fb.control(''),
    published: this.fb.control(true),
  });

  constructor() {
    effect(() => {
      const tomato = this.tomato();
      if (tomato) {
        this.form.patchValue({
          name: tomato.name,
          price: tomato.price,
          description: tomato.description,
        });
      }
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) return;

    const tomato = this.tomato();
    const formValue = this.form.value;

    if (tomato) {
      this.dispatcher.dispatch(
        tomatoesEvents.updateTomato({
          documentId: tomato.documentId,
          changes: {
            name: formValue.name!,
            price: formValue.price!,
            description: formValue.description!,
          },
        }),
      );
    } else {
      this.dispatcher.dispatch(
        tomatoesEvents.createTomato({
          name: formValue.name!,
          price: formValue.price!,
          description: formValue.description!,
        }),
      );
    }
  }
}
