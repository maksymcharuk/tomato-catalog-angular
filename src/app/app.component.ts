import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs/operators';

import { BrandsApiService } from './services/brands-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly brandsApiService = inject(BrandsApiService);

  protected readonly title = signal('brands-catalog-angular');
  protected readonly brands$ = this.brandsApiService
    .find()
    .pipe(map((response) => response.data));

  constructor() {
    this.brands$.subscribe((brands) => {
      console.log('Brands loaded:', brands);
    });
  }
}
