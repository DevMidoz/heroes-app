import { Injectable } from '@angular/core';
import { heroes } from '../models/const';
import { Observable, map, of } from 'rxjs';
import { IHero } from '../models/hero';
import { Actions } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  createHero(request: IHero): Observable<any> {
    return of(heroes).pipe(map((heroes) => [...heroes, { ...request }]));
  }
  updateHero(request: IHero): Observable<any> {
    return of(heroes).pipe(
      map((heroes) => {
        let foundHeroIndex = heroes.findIndex((hero) => hero.id === request.id);
        if (foundHeroIndex > -1) {
          heroes[foundHeroIndex] = request;
          // heroes = heroes.filter((hero) => hero.id !== request.id);
          // let arr = [...heroes, { ...request }];
          return heroes;
        } else {
          return heroes; // i will fix this later
        }
      })
    );
  }
  deleteHero(heroes: IHero[]): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getAllHeroes(): Observable<IHero[]> {
    return of(heroes).pipe(
      map((heroes) => heroes.map((hero) => ({ ...hero })))
    );
  }

  

  constructor() {}
}
