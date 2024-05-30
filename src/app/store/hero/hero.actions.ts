import { createAction, props } from '@ngrx/store';
import { IHero } from '../../pages/heroes/models/hero';


export const addHero = createAction(
  '[Hero Page] Add Hero',
  props<{ content: IHero }>()
);

export const editHero = createAction(
  '[Hero Page] Edit Hero',
  props<{ content: IHero }>()
);

export const removeHero = createAction(
  '[Hero Page] Remove Hero',
  props<{ id: string }>()
);

export const loadHeroes = createAction('[Hero Page] Load Heroes');

export const loadHeroesSuccess = createAction(
  '[Hero Page] Heroes Load Success',
  props<{ heroes: IHero[] }>()
);

export const loadHeroesFailure = createAction(
  '[Hero Page] Heroes Load Failure',
  props<{ error: string }>()
);
