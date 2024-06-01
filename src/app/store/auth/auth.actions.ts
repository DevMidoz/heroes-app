import { createAction, props } from '@ngrx/store';
import { IHero } from '../../pages/heroes/models/hero';
import { ILoginRequest, IRegisterRequest } from '../../auth/models/user';

export const login = createAction(
  '[Auth Page] Login',
  props<{ content: ILoginRequest }>()
);

export const register = createAction(
  '[Auth Page] Register',
  props<{ content: IRegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth API] Register Success',
  props<{ user: IHero }>() // Replace 'any' with your user model
);

export const registerFailure = createAction(
  '[Auth API] Register Failure',
  props<{ error: any }>() // Replace 'any' with an appropriate error model
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: IHero }>() // Replace 'any' with your user model
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: any }>() // Replace 'any' with an appropriate error model
);
