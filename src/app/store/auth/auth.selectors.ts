import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';
import { AppState } from '../app.state';

const _selectUser = createFeatureSelector<AppState>('user');

export const selectUser = createSelector(
    _selectUser,
  (state: AppState) => state?.User.user
);
