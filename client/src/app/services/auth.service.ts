import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Roles, User } from '../models/user.model';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment.development';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {
    this.loginFromLocalStorage()
  }

  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  get user(): Observable<User | null> { return this.user$.asObservable() }

  get loggedIn$ () {
    return this.user.pipe(map(x => !!x))
  }


  loginWithPopup(action: 'login' | 'signup' = 'login') {
    const d = this.dialog.open(LoginDialogComponent, {data: {action}})
    return d.afterClosed()
  }
  
  login(username: string, password: string ): Observable<User | null> {
    
    return this.api.post<User>(`/login`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))
    return of(new User({username, role: Roles.IMPIEGATI})).pipe(tap(x => this.user$.next(x)))
  }

  register(username: string, password: string): Observable<User | null> {
    return this.api.post<User>(`/signup`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))
  }

  private loginFromLocalStorage() {
    const ls = localStorage.getItem('auth-session')
    console.log(ls)
    
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
  }
}
