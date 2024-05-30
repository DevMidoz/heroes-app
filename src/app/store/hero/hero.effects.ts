import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addHero,
  editHero,
  loadHeroes,
  loadHeroesFailure,
  loadHeroesSuccess,
  removeHero,
} from './hero.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HeroesService } from '../../pages/heroes/services/heroes.service';
import { IHero } from '../../pages/heroes/models/hero';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from './hero.selectors';

@Injectable()
export class HeroesEffects {
  constructor(
    private actions$: Actions,
    private _heroesService: HeroesService,
    private store: Store<AppState>
  ) {}

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHeroes),
      switchMap(() =>
        from(this._heroesService.getAllHeroes()).pipe(
          map((heroes: IHero[]) => loadHeroesSuccess({ heroes: heroes })),
          catchError((error) => of(loadHeroesFailure({ error })))
        )
      )
    )
  );

  createHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHero, editHero, removeHero),
      withLatestFrom(this.store.select(selectAllHeroes)),
      switchMap(([actions, heroes]) =>
        from(this._heroesService.createHero(heroes, actions))
      )
    )
  );

  //   updateHero$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(addHero, editHero, removeHero),
  //         withLatestFrom(this.store.select(selectAllHeroes)),
  //         switchMap(([actions, heroes]) =>
  //           from(this._heroesService.saveHeroes(heroes))
  //         )
  //       )
  //   );

  //   deleteHero$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(addHero, editHero, removeHero),
  //         withLatestFrom(this.store.select(selectAllHeroes)),
  //         switchMap(([actions, heroes]) =>
  //           from(this._heroesService.saveHeroes(heroes))
  //         )
  //       )
  //   );
}
