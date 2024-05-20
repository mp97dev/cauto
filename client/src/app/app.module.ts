import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProspectPageComponent } from './pages/prospect-page/prospect-page.component';
import { NewProspectPageComponent } from './pages/new-prospect-page/new-prospect-page.component';
import { EvaluationPageComponent } from './pages/evaluation-page/evaluation-page.component';
import { BranchesPageComponent } from './pages/branches-page/branches-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NotfoundPageComponent,
    LoginPageComponent,
    ProspectPageComponent,
    NewProspectPageComponent,
    EvaluationPageComponent,
    BranchesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
