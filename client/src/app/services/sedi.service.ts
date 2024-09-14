import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SediService {

  constructor(
    private api: ApiService
  ) { }

  private sedi$ = new BehaviorSubject<Sede[] | null>(null)

  get sedi(): Observable<Sede[]> {
    return this.sedi$.asObservable().pipe(
      switchMap(res => res ? of(res) : this.updateSedi())
    )
  }

  updateSedi(): Observable<Sede[]> {
    return this.api.get<Sede[]>(`/sedi`).pipe(tap(res => this.sedi$.next(res)))
    return of(d)
  }

  deleteSede(sede: Sede) {
    return this.api.delete<Sede>(`/sedi/${sede.id}`).pipe(finalize(() => this.updateSedi()))
  }

  aggiungiSede(sede: Sede) {
    return this.api.post<Sede>(`/sedi`, sede).pipe(finalize(() => this.updateSedi()))
  }
}

export interface Sede {
  id?: number
  indirizzo: string
  nome: string
}

export const d = [
  {
      "id": 1,
      "indirizzo": "Via Roma 123, Milano",
      "nome": "AutoStar Milano"
  },
  {
      "id": 2,
      "indirizzo": "Corso Vittorio Emanuele 101, Torino",
      "nome": "TopCars Torino"
  },
  {
      "id": 3,
      "indirizzo": "Piazza della Repubblica 1, Firenze",
      "nome": "DriveNow Firenze"
  },
  {
      "id": 4,
      "indirizzo": "Via Veneto 50, Roma",
      "nome": "LuxuryMotors Roma"
  },
  {
      "id": 5,
      "indirizzo": "Via Toledo 10, Napoli",
      "nome": "FastAuto Napoli"
  },
  {
      "id": 6,
      "indirizzo": "Via Indipendenza 88, Bologna",
      "nome": "SuperCars Bologna"
  },
  {
      "id": 7,
      "indirizzo": "Piazza San Marco 5, Venezia",
      "nome": "AutoElite Venezia"
  },
  {
      "id": 8,
      "indirizzo": "Via Maqueda 22, Palermo",
      "nome": "MotorCity Palermo"
  }
]