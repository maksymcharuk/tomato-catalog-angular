import { signalStore, withState } from '@ngrx/signals';

type TomatoFormState = {};

const initialState: TomatoFormState = {};

export const TomatoFormStore = signalStore(withState(initialState));
