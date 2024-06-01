import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { IHero } from '../../pages/heroes/models/hero';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService
          .login({
            username: action.content.username,
            password: action.content.password,
          })
          .pipe(
            map((user) => {
              if (Object.keys(user).length === 0) {
                this._snackBar.open('Not authorized User', 'Close', {
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom',
                  panelClass: ['error-snackbar'],
                  duration: 3500,
                });
                return AuthActions.loginFailure({ error: 'error while login' });
              } else {
                return AuthActions.loginSuccess({ user });
              }
            }),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) => {
        return this.authService
        .register({
          name: action.content.name,
          powers: action.content.powers,
          description: action.content.description,
          username: action.content.username,
          password: action.content.password,
          role: action.content.role,
        })
        .pipe(
          map((user: IHero) => AuthActions.registerSuccess({ user: user })),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          return this.router.navigate(['/heroes']);
        })
      ),
    { dispatch: false }
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          return this.router.navigate(['/heroes']);
        }) 
      ),
    { dispatch: false } 
  );

  constructor(
    private actions$: Actions,
    private authService: AuthServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
}
