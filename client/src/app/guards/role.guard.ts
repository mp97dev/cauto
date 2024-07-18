import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  return auth.user.pipe(map(x => x?.roles.includes(route.data['roles']) ?? false));
};
