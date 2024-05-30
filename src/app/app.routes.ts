import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { heroesRoutes } from './pages/heroes/heroes.routes';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    ...authRoutes,
    ...heroesRoutes
];
