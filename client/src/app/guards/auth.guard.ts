import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  return auth.user.pipe(map(x => !!x))
};
