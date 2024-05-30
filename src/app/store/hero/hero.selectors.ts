import { createSelector } from '@ngrx/store';
import { HeroState } from './hero.reducers';
import { AppState } from '../app.state';

export const selectHeroes = (state: AppState) => state.Heroes;

export const selectAllHeroes = createSelector(
  selectHeroes,
  (state: HeroState) => state?.heroes
);
