import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { heroReducer } from './store/hero/hero.reducers';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { HeroesEffects } from './store/hero/hero.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ hero: heroReducer }),
    provideEffects([HeroesEffects])
  ],
};
