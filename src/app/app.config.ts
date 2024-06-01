import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { heroReducer } from './store/hero/hero.reducers';
import { provideEffects } from '@ngrx/effects';
import { HeroesEffects } from './store/hero/hero.effects';
import {
  StoreDevtoolsModule,
  provideStoreDevtools,
} from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthEffects } from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ hero: heroReducer }),
    provideEffects([HeroesEffects, AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
  ],
};
