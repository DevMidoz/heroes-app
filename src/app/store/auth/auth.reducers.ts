import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IHero } from '../../pages/heroes/models/hero';

export interface AuthState {
  user: IHero | null;
}

export const initialState = {
  user: {},
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { content }) => {
    return { ...state };
  }),
  on(AuthActions.register, (state, { content }) => {
    return { ...state };
  }),
  on(AuthActions.registerSuccess, (state, { user }) => {
    return { ...state, user: { ...user } };
  }),
  on(AuthActions.registerFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(AuthActions.loginSuccess, (state, { user }) => {
    return { ...state, user: { ...user } };
  }),
  on(AuthActions.loginFailure, (state, { error }) => {
    return { ...state, error };
  })
);
