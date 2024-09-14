import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from './services/auth.service';


export function authHeaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService)

  return auth.user.pipe(
    tap(user => { if(user) req.headers.set('Authorization', `${user.username}#${user.role}`)}),
    switchMap(() => next(req))
  )
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authHeaderInterceptor])), provideAnimationsAsync()
  ]
};
