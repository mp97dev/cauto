import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deepMerge } from '../utils';
import { environment } from '../../environments/environment.development';

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
    return this.http.get<T>(`${environment.apiUrl}${path}`, {headers: headers})
  }

  post<T>(path: string, body?: any, options?: any): Observable<T> {
    const headers = deepMerge(this.options, options)
    return this.http.post<T>(`${environment.apiUrl}${path}`, body, {headers: headers})
  }

  delete<T>(path: string, body: any = Object,  options?: any): Observable<T> {
    const headers = deepMerge(this.options, options)
    return this.http.delete<T>(`${environment.apiUrl}${path}`, {headers: headers, body: body})
  }

  put<T>(path: string, body?: any, options?: any): Observable<T> {
    const headers = deepMerge(this.options, options)
    return this.http.put<T>(`${environment.apiUrl}${path}`, body, {headers: headers})
  }
}
