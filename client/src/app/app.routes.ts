import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProspectPageComponent } from './pages/prospect-page/prospect-page.component';
import { authGuard } from './guards/auth.guard';
import { AdminPageComponent } from './pages/admin/admin-page/admin-page.component';
import { EvaluationsPageComponent } from './pages/admin/evaluations-page/evaluations-page.component';
import { BranchesPageComponent } from './pages/admin/branches-page/branches-page.component';
import { roleGuard } from './guards/role.guard';
import { Roles } from './models/user.model';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Cauto' },
  { path: 'login', component: LoginPageComponent, title: 'Cauto login' },
  {
    path: 'prospect',
    component: ProspectPageComponent,
    title: 'Cauto prospect',
    canActivate: [authGuard]
  },
  { path: 'admin', component: AdminPageComponent, canActivate: [authGuard, roleGuard], data: {roles: [ Roles.ADMIN ]}, children: [
    { path: 'evaluations', component: EvaluationsPageComponent, title: 'Cauto evaluations'},
    { path: 'branches', component: BranchesPageComponent, title: 'Branches'}
  ]},
];
