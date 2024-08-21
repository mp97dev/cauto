import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Roles, User } from '../models/user.model';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private api: ApiService,
  ) {
    this.checkPreviousSession()
  }

  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  get user(): Observable<User | null> { return this.user$.asObservable() }

  private token$: BehaviorSubject<string | null>= new BehaviorSubject<string | null>(null)
  get token(): Observable<string | null> { return this.token$.asObservable() }


  loginWithDialog(dialog: MatDialog) {

    const ref = dialog.open(LoginDialogComponent)
    ref.afterClosed().subscribe({
      next: res => console.log(res)
    })
  }
  
  login(creds: { username: string, password: string }): Observable<User | null> {
    
    // return this.api.post<User>(`${environment.apiUrl}/login`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))

    const testUser = new User({ loggedIn: true, roles: [ Roles.SEGRETERIA, Roles.IMPIEGATI ], username: creds.username, email: creds.username, token: 'ABC' })
    
    if(creds.username === 'admin' && creds.password === 'admin')
      return of(testUser).pipe(tap(x => this.user$.next(x)))
    return of(null)
  }

  register(creds: { username: string, password: string, email: string }): Observable<User | null> {
    //return this.api.post<User>(`${environment.apiUrl}/register`, {username, password}).pipe(tap(x => this.user$.next(new User(x))))

    const testUser = new User({ loggedIn: true, roles: [], username: creds.username, email: creds.email })
    return of(testUser).pipe(tap(x => this.user$.next(x)))
  }

  private loginFromLocalStorage() {
    const ls = localStorage.getItem('auth-session')
    if(!ls) return
    
    let session
    try {
      session = JSON.parse(ls)
      if(!session) return
      // session = // todo
    } catch {}

    if(ls) this.user$.next(session.user) 
  }

  private checkPreviousSession() {
    const prev = localStorage.getItem('token')
    if(!prev) return

    if(this.isTokenExpired(prev)) {
      localStorage.removeItem('token')
      return
    }

    this.token$.next(prev)
    this.populateUser()
  }

  private isTokenExpired(token: string): boolean {

    try {
      const decoded: {exp: number} = { exp: 1234 }
      // const decoded = jwt_decode.jwtDecode(token)
      const expirationDate = new Date(0)
      const exp = decoded.exp
      if(!exp) return true
      expirationDate.setUTCSeconds(exp)
      
      return expirationDate < new Date()
    } catch(err) {
      return true
    }
  }

  private populateUser() {
    // try {
    //   if(!this.token) return
    //   // const decoded = jwt_decode.jwtDecode(this.token)
    //   // this.user$.next(decoded)
    // }
  }


}
