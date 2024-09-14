import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProspectPageComponent } from './pages/prospect-page/prospect-page.component';
import { authGuard } from './guards/auth.guard';
import { BranchesPageComponent } from './pages/branches-page/branches-page.component';
import { roleGuard } from './guards/role.guard';
import { Roles } from './models/user.model';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CatalogoPageComponent } from './pages/catalogo-page/catalogo-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },

  {
    path: 'catalogo',
    title: 'Cauto | Catalogo',
    component: CatalogoPageComponent
  },
  // preventivi
  {
    path: 'preventivo',
    component: ProspectPageComponent,
    title: 'Cauto | Preventivo',
  },

  // sia impiegati che utenti
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    title: 'Cauto | Dashboard',
    canActivate: [authGuard],
  },

  // segreteria only
  {
    path: 'sedi',
    component: BranchesPageComponent,
    title: 'Cauto | Sedi',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Roles.SEGRETERIA]}
  }
];
