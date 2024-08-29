import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IMacchina, Macchina } from '../models/macchina.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MacchineService {

  constructor(
    private api: ApiService
  ) { }

  private cars$: BehaviorSubject<Macchina[]> = new BehaviorSubject<Macchina[]>([])
  get carsAsObservable(): Observable<Macchina[]> { return this.cars$.asObservable() }

  getCars() {


    return this.api.get<IMacchina[]>('/macchine').pipe(
      map(x => x.map(c => new Macchina(c)) ),
      tap(x => {if (x) this.cars$.next(x) })
    )
  }
}
