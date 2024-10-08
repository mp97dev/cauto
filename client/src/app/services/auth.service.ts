import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { Roles, User } from '../models/user.model';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.loginFromLocalStorage()
  }

  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  get user(): Observable<User | null> { return this.user$.asObservable() }

  get loggedIn$ () {
    return this.user.pipe(map(x => !!x))
  }


  loginWithPopup(action: 'login' | 'signup' = 'login'): Observable<unknown> {
    const d = this.dialog.open(LoginDialogComponent, {data: {action}})
    return d.afterClosed().pipe(
      switchMap((res: 'signup' | 'login' | null | undefined) => res ? this.loginWithPopup(res) : of(null))
    )
  }
  
  login(username: string, password: string ): Observable<User | null> {
    
    // return of(new User({username, role: Roles.IMPIEGATI})).pipe(tap(x => this.user$.next(x)))
    return this.api.post<User>(`/login`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))
  }

  register(username: string, password: string): Observable<User | null> {
    // return of(new User({username, role: Roles.IMPIEGATI})).pipe(tap(x => this.user$.next(x)))
    return this.api.post<User>(`/signup`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))
  }

  private loginFromLocalStorage() {
    const ls = localStorage.getItem('auth-session')
    
    if(!ls) return
    
    try {
      if(!ls) return
      const u = new User(JSON.parse(ls))
      if(!u) return
      this.user$.next(u)
    } catch {}
  }

  logout() {
    localStorage.removeItem('auth-session')
    this.user$.next(null)
    this.router.navigate(['/'])
  }
}
