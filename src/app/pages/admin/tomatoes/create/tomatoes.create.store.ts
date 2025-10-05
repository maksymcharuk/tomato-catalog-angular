import { signalStore, withState } from '@ngrx/signals';

type TomatoesCreatePageState = {};

const initialState: TomatoesCreatePageState = {};

export const TomatoesCreatePageStore = signalStore(withState(initialState));
