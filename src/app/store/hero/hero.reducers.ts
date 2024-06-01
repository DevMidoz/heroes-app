import { createReducer, on } from '@ngrx/store';
import { IHero } from '../../pages/heroes/models/hero';
import {
  addHero,
  addHeroSuccess,
  editHero,
  editHeroSuccess,
  loadHeroes,
  loadHeroesFailure,
  loadHeroesSuccess,
  removeHero,
} from './hero.actions';

export interface HeroState {
  heroes: IHero[];
  error: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
}

export const heroInitialState: HeroState = {
  heroes: [],
  error: null,
  status: 'pending',
};



export const heroReducer = createReducer(
  heroInitialState,
  on(addHero, (state, { content }) => ({
    ...state,
    heroes: [...state.heroes, { ...content }],
    status: 'success' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(addHeroSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(editHero, (state, { content }) => ({
    ...state,
    heroes: replaceHero([...state.heroes], content),
    status: 'success' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(editHeroSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(removeHero, (state, { id }) => ({
    ...state,
    heroes: [...state.heroes.filter((hero: IHero) => hero.id !== id)],
    status: 'success' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(loadHeroes, (state) => ({
    ...state,
    status: 'loading' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(loadHeroesSuccess, (state, { heroes }) => ({
    ...state,
    heroes: heroes,
    error: null,
    status: 'success' as 'pending' | 'loading' | 'success' | 'error',
  })),
  on(loadHeroesFailure, (state, { error }) => ({
    ...state,
    status: 'error' as 'pending' | 'loading' | 'success' | 'error',
    error: error,
  }))
);

function replaceHero(heroes: IHero[], content: IHero) {
  const updatedHero = content;
  const heroIndex = heroes.findIndex((hero) => hero.id === updatedHero.id);

  if (heroIndex !== -1) {
    const updatedHeroes = [...heroes];
    updatedHeroes[heroIndex] = { ...updatedHeroes[heroIndex], ...updatedHero };
    return updatedHeroes;
  } else {
    console.warn('Hero with ID', updatedHero.id, 'not found.');
    return heroes; // Return original state if hero not found
  }
}
