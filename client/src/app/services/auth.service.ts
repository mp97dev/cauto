import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
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
    this.dialog.open(LoginDialogComponent, {data: {action}})
  }
  
  login(username: string, password: string ): Observable<User | null> {
    
    return this.api.post<User>(`${environment.apiUrl}/login`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))
  }

  register(username: string, password: string): Observable<User | null> {
    return this.api.post<User>(`${environment.apiUrl}/signup`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))
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
  }
}
