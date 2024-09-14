import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProspectPageComponent } from './pages/prospect-page/prospect-page.component';
import { authGuard } from './guards/auth.guard';
import { EvaluationsPageComponent } from './pages/admin/evaluations-page/evaluations-page.component';
import { BranchesPageComponent } from './pages/admin/branches-page/branches-page.component';
import { roleGuard } from './guards/role.guard';
import { Roles } from './models/user.model';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Cauto',
  },
  {
    path: 'prospect',
    component: ProspectPageComponent,
    title: 'Cauto | Prospect',
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    title: 'Cauto | Dashboard',
    canActivate: [authGuard],
  },
  {
    path: 'evaluations',
    component: EvaluationsPageComponent,
    title: 'Cauto | Evaluations',
    canActivate: [authGuard, roleGuard],
    data: {roles: [Roles.IMPIEGATI]}
  },
  {
    path: 'branches', // filiali
    component: BranchesPageComponent,
    title: 'Cauto | Branches',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Roles.SEGRETERIA]}
  }
];
