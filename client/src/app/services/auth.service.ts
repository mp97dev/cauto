import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private api: ApiService,
  ) {
    this.user$.next(new User())
  }

  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  get user(): Observable<User | null> { return this.user$.asObservable() }  


  login(user: string, password: string) {

    // this.api.post<User>(`${environment.apiUrl}/login`, {user, password}).pipe(tap(x => this.user$.next(new User(x))))
  
    this.user$.next(new User({loggedIn: true}))
  }
}
