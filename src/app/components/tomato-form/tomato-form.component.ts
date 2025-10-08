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
import { Media } from '../../api/shared';

import { TomatoFormStore } from './tomato-form.component.state';
import { LocaleService } from '../../services/locale.service';
import { tomatoFormEvents } from './tomato-form.events';

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
  private readonly dispatcher = inject(Dispatcher);
  readonly store = inject(TomatoFormStore);
  readonly localeService = inject(LocaleService);

  readonly tomato = input<Tomato | null>(null);
  readonly currentImages = new Map<number, Media>();

  readonly form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    price: this.fb.control(0),
    description: this.fb.control(''),
    // published: this.fb.control(true),
    images: this.fb.control<File[]>([]),
  });

  constructor() {
    effect(() => {
      const tomato = this.tomato();
      if (tomato) {
        this.initImages(tomato);

        this.form.patchValue({
          name: tomato.name,
          price: tomato.price,
          description: tomato.description,
        });
      }
    });
  }

  initImages(tomato: Tomato) {
    this.currentImages.clear();
    (tomato.images ?? []).forEach((image) => {
      if (image.id) {
        this.currentImages.set(image.id, image);
      }
    });
  }

  choose(event: Event, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(
    event: Event,
    file: File,
    removeFileCallback: (event: Event, index: number) => void,
    index: number,
  ) {
    removeFileCallback(event, index);
  }

  onRemoveUploadedFile(file: Media) {
    this.currentImages.delete(file.id);
  }

  onFileSelect(event: { originalEvent: Event; currentFiles: File[] }) {
    const files = event.currentFiles;
    if (files && files.length > 0) {
      this.form.patchValue({
        images: files,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const tomato = this.tomato();
    const formValue = this.form.value;

    if (tomato) {
      this.dispatcher.dispatch(
        tomatoFormEvents.updateTomato({
          documentId: tomato.documentId,
          changes: {
            name: formValue.name!,
            price: formValue.price,
            description: formValue.description,
            images: [
              ...Array.from(this.currentImages.keys()),
              ...(formValue.images ?? []),
            ],
            primaryImage:
              !tomato.primaryImage && formValue.images
                ? formValue.images[0]
                : undefined,
          },
        }),
      );
    } else {
      this.dispatcher.dispatch(
        tomatoFormEvents.createTomato({
          name: formValue.name!,
          price: formValue.price,
          description: formValue.description,
          images: formValue.images,
          primaryImage: formValue.images ? formValue.images[0] : undefined,
        }),
      );
    }
  }
}
