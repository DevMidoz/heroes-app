import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroState } from './hero.reducers';
import { AppState } from '../app.state';
import { IHero } from '../../pages/heroes/models/hero';

const selectHeroes = createFeatureSelector<HeroState>('hero');

export const selectAllHeroes = createSelector(
  selectHeroes,
  (state: HeroState) => state?.heroes
);

export const successSelector = createFeatureSelector<HeroState>(
  'operationSuccessfully'
);

export const selectStatus = createSelector(
  successSelector,
  (state: HeroState) => state?.status
);
