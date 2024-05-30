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
  createHero(heroes: IHero[], actions: ({ content: IHero; } & TypedAction<"[Hero Page] Add Hero">) | ({ content: IHero; } & TypedAction<"[Hero Page] Edit Hero">) | ({ id: string; } & TypedAction<"[Hero Page] Remove Hero">)): Observable<any> {
    console.log(actions);
    return of(heroes).pipe(
      map((heroes) => heroes.map((hero) => ({ ...hero })))
    );
  }
  updateHero(heroes: IHero[]): Observable<any> {
    throw new Error('Method not implemented.');
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
