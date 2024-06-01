import { Injectable } from '@angular/core';
import { ILoginRequest, IRegisterRequest } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { heroes } from '../../pages/heroes/models/const';
import { RandomStringService } from '../../shared/services/random-string.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  register(requestBody: IRegisterRequest): Observable<any> {
    let req = {
      id: this.randomStringService.generateRandomString(),
      ...requestBody,
    };
    return of(heroes).pipe(map((heroes) => [...heroes, { ...req }]));
  }
  login(requestBody: ILoginRequest) : Observable<any>{
    let foundUser = heroes.find((hero) => hero.name === requestBody.username);
    if (foundUser) {
      return of(foundUser);
    } else {
      return of({});
    }
  }

  constructor(private randomStringService: RandomStringService) {}
}
