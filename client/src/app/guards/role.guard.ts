import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';
import { Roles } from '../models/user.model';



export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthService)
  const roles = route.data['roles'] as Roles[];
  const router = inject(Router);

  return auth.user.pipe(map(user => {
    if (!user) {
      router.navigate([state.url]);
      return false;
    }
    
    if(!user.role) {
      router.navigate(['/']);
      return false;
    }

    if (!roles.includes(user.role)) {
      router.navigate(['/']);
      return false;
    }

    return true
  }));
};
