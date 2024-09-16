import { ApplicationConfig, inject, Injectable, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const auth = inject(AuthService)
    
    // return auth.user.pipe(
    //   take(1),
    //   map(u => u ? req.clone({
    //     headers: req.headers.set('Authorization', `${u.username}#${u.role}`)
    //   }) : req),
    //   switchMap(u => handler.handle(u))
    // )

    return auth.user.pipe(
      take(1),
      switchMap((user: User | null) => {
        if(!user) return handler.handle(req)

        const authReq = req.clone({
          setHeaders: {
            Authorization: `${user.username}#${user.role}`
          }
        })
        return handler.handle(authReq)
      })
    )
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()), provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ]
};