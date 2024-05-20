import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProspectPageComponent } from './pages/prospect-page/prospect-page.component';
import { NewProspectPageComponent } from './pages/new-prospect-page/new-prospect-page.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { RoleGuardGuard } from './guard/role-guard.guard';
import { EvaluationPageComponent } from './pages/evaluation-page/evaluation-page.component';
import { BranchesPageComponent } from './pages/branches-page/branches-page.component';

enum Roles {
  SEGRETERIA = 'segreteria',
  IMPIEGATO = 'impiegato',
  ADMIN = 'admin'
}

const routes: Routes = [
  {
    path: '/',
    component: LandingPageComponent,
    title: 'Cauto'
  },
  {
    path: '/login',
    component: LoginPageComponent
  },
  {
    path: '/prospect',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '/dashboard',
        component: ProspectPageComponent
        
      },
      {
        path: '/new',
        component: NewProspectPageComponent
      },
      {
        path: '**',
        redirectTo: '/dashboard'
      }
    ]
  },
  {
    path: '/admin',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {allowedRoles: [Roles.IMPIEGATO, Roles.SEGRETERIA]},
    children:  [
      {
        path: '/evaluation',
        component: EvaluationPageComponent,
        canActivate: [RoleGuardGuard],
        data: {allowedRoles: [Roles.IMPIEGATO]}
      },
      {
        path: '/branches',
        component: BranchesPageComponent,
        canActivate: [RoleGuardGuard],
        data: {allowedRoles: [Roles.SEGRETERIA]}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
