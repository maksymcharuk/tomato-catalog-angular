import { inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { mapResponse } from '@ngrx/operators';
import { map, of, switchMap } from 'rxjs';

import { UploadApiService } from '../../services/upload-api.service';
import { TomatoesApiService } from '../../services/tomatoes-api.service';
import { tomatoFormEvents } from './tomato-form.events';
import { UpdateTomatoDto } from './types';

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
              primaryImage: undefined,
            });
          }
          return uploadApiService.upload({ files: data.images }).pipe(
            map((response) => {
              const uploadedFiles = response.map((file) => file.id);
              return {
                ...data,
                images: uploadedFiles,
                primaryImage: uploadedFiles[0],
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
          const { ids, files } = splitUrlsAndFiles(data.changes.images ?? []);
          if (files.length === 0) {
            return of(data);
          }
          return uploadApiService.upload({ files }).pipe(
            map((response) => {
              const uploadedFiles = response.map((file) => file.id);
              return {
                ...data,
                changes: {
                  ...data.changes,
                  images: uploadedFiles.concat(ids),
                  primaryImage: ids[0] || uploadedFiles[0],
                },
              };
            }),
          );
        }),
        switchMap(({ documentId, changes }) => {
          const sanitized = sanitizedChanges(changes);
          return tomatoesApiService.update(documentId, sanitized).pipe(
            mapResponse({
              next: (response) =>
                tomatoFormEvents.updateTomatoSuccess(response.data),
              error: (error: { message: string }) =>
                tomatoFormEvents.updateTomatoFailure(error.message),
            }),
          );
        }),
      ),
    }),
  ),
);

function splitUrlsAndFiles(images: (File | number)[]) {
  const ids = images.filter((image) => typeof image === 'number');
  const files = images.filter((image) => typeof image !== 'number');
  return { ids, files };
}

function sanitizedChanges(changes: UpdateTomatoDto['changes']) {
  return {
    ...changes,
    images: (changes.images ?? []).filter((image) => typeof image === 'number'),
    primaryImage:
      typeof changes.primaryImage === 'number'
        ? changes.primaryImage
        : undefined,
  };
}
