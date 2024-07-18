import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deepMerge } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  options = {}

  get<T>(path: string, options?: any): Observable<T>  {
    const headers = deepMerge(this.options, options)
    return this.http.get<T>(path, {headers: headers})
  }

  post<T>(path: string, body?: any, options?: any): Observable<T> {
    const headers = deepMerge(this.options, options)
    return this.http.post<T>(path, body, {headers: headers})
  }
}
