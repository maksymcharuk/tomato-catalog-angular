import { inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { mapResponse } from '@ngrx/operators';
import { map, of, switchMap } from 'rxjs';

import { UploadApiService } from '../../services/upload-api.service';
import { TomatoesApiService } from '../../services/tomatoes-api.service';
import { tomatoFormEvents } from './tomato-form.events';
import { tomatoesApiEvents } from '../../store/events';

type TomatoFormState = {
  isSaving: boolean;
  error: string | null;
};

const initialState: TomatoFormState = {
  isSaving: false,
  error: null,
};

export const TomatoFormStore = signalStore(
  withState(initialState),
  withReducer(
    on(tomatoFormEvents.createTomato, tomatoFormEvents.updateTomato, () => ({
      isSaving: true,
    })),
    on(
      tomatoFormEvents.createTomatoSuccess,
      tomatoFormEvents.createTomatoFailure,
      tomatoFormEvents.updateTomatoSuccess,
      tomatoFormEvents.updateTomatoFailure,
      () => ({
        isSaving: false,
      }),
    ),
    on(
      tomatoFormEvents.createTomatoFailure,
      tomatoFormEvents.updateTomatoFailure,
      (state, { error }) => ({
        ...state,
        error,
      }),
    ),
    on(
      tomatoFormEvents.createTomatoSuccess,
      tomatoFormEvents.updateTomatoSuccess,
      (state) => ({
        ...state,
        error: null,
      }),
    ),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      uploadApiService = inject(UploadApiService),
      tomatoesApiService = inject(TomatoesApiService),
    ) => ({
      createTomato$: events.on(tomatoFormEvents.createTomato).pipe(
        switchMap(({ payload: data }) => {
          if (!data.images || data.images.length === 0) {
            return of({
              ...data,
              images: [],
              primaryImage: '',
            });
          }
          return uploadApiService.upload({ files: data.images }).pipe(
            map((response) => {
              const uploadedFiles = response.map((file) => file.id);
              return {
                ...data,
                images: uploadedFiles,
                primaryImage: uploadedFiles[0] || '',
              };
            }),
          );
        }),
        switchMap((data) => {
          return tomatoesApiService.create(data).pipe(
            mapResponse({
              next: (response) =>
                tomatoFormEvents.createTomatoSuccess(response.data),
              error: (error: { message: string }) =>
                tomatoFormEvents.createTomatoFailure(error.message),
            }),
          );
        }),
      ),
      updateTomato$: events.on(tomatoFormEvents.updateTomato).pipe(
        switchMap(({ payload: data }) => {
          if (!data.changes.images || data.changes.images.length === 0) {
            return of({
              ...data,
              changes: {
                ...data.changes,
                images: [],
                primaryImage: '',
              },
            });
          }
          return uploadApiService.upload({ files: data.changes.images }).pipe(
            map((response) => {
              const uploadedFiles = response.map((file) => file.id);
              return {
                ...data,
                changes: {
                  ...data.changes,
                  images: uploadedFiles,
                  primaryImage: uploadedFiles[0] || '',
                },
              };
            }),
          );
        }),
        switchMap(({ documentId, changes }) => {
          return tomatoesApiService.update(documentId, changes).pipe(
            mapResponse({
              next: (response) =>
                tomatoesApiEvents.updateSuccess(response.data),
              error: (error: { message: string }) =>
                tomatoesApiEvents.updateFailure(error.message),
            }),
          );
        }),
      ),
    }),
  ),
);
