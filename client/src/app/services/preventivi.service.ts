import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';
import { Optional } from '../models/macchina.model';
import { AuthService } from './auth.service';
import { Roles } from '../models/user.model';
import { Sede } from './sedi.service';

@Injectable({
  providedIn: 'root'
})
export class PreventiviService {

  private user = inject(AuthService).user

  constructor(
    private api: ApiService
  ) { }

  private preventivi$ = new BehaviorSubject<Preventivo[] | null>(null);
  get preventivi(): Observable<Preventivo[]> {
    return this.preventivi$.asObservable()
    .pipe(
      switchMap(p => 
        p ? of(p) : this.user.pipe(take(1), switchMap(user => (user && user.role === Roles.IMPIEGATI) ? this.getAllPreventivi() : this.getUserPreventivi())))
    );
  }

  getAllPreventivi(): Observable<Preventivo[]> {
    return this.api.get<Preventivo[]>(`/preventivi`).pipe(tap(p => this.preventivi$.next(p)))
    // return of(d)
  }

  getUserPreventivi(): Observable<Preventivo[]> {
    return this.api.get<Preventivo[]>(`/preventivi/user`).pipe(tap(p => this.preventivi$.next(p)))
    // return of(d)
  }

  deletePreventivo(p: Preventivo): Observable<Preventivo> {
    return this.api.delete<Preventivo>(`/preventivi/${p.id}`)
    // return of(d[0])
  }

  valutaUsato(p: Preventivo, valutazione: number): Observable<Preventivo> {
    return this.api.put<Preventivo>(`/preventivi/usato/${p.id}`, {valutazione})
    // return of(d[0])
  }

  aggiungiAcconto(p: Preventivo, acconto: number): Observable<Preventivo> {
    return this.api.put<Preventivo>(`/preventivi/acconto/${p.id}`, {acconto})
    // return of(d[0])
  }
}

export interface Preventivo {
  acconto: number;
  data_consegna: string | null;
  data_creazione: string;
  data_scadenza: string;
  id: number;
  luogo_ritiro: Sede;
  marca: string;
  modello: string;
  optionals: Optional[];
  prezzo_finale: number;
  sconto: number | null;
  usato: {descrizione: string, immagini: string[]} | null;
  utente: string;
}

export const d = [
  {
      "acconto": 2000,
      "data_consegna": "2024-08-30",
      "data_creazione": "2024-08-23",
      "data_scadenza": "2024-09-30",
      "id": 1,
      "luogo_ritiro": {
          "sede": "Milano"
      },
      "marca": "Fiat",
      "modello": "500",
      "optionals": [
          {
              "nome": "Climatizzatore",
              "opzioni": [
                  "Automatico",
                  "Bizona"
              ],
              "prezzo": 500
          },
          {
              "nome": "Tetto panoramico",
              "opzioni": [
                  "Apertura elettrica"
              ],
              "prezzo": 1000
          }
      ],
      "prezzo_finale": 14000,
      "sconto": 5.5,
      "usato": {
          "descrizione": "Fiat 500 usata, anno 2018, 50.000 km",
          "immagini": [
              "img1.jpg",
              "img2.jpg"
          ]
      },
      "utente": "Mario Rossi"
  },
  {
      "acconto": 5000,
      "data_consegna": null,
      "data_creazione": "2024-08-21",
      "data_scadenza": "2024-09-25",
      "id": 2,
      "luogo_ritiro": {
          "sede": "Roma"
      },
      "marca": "BMW",
      "modello": "X3",
      "optionals": [
          {
              "nome": "Navigatore satellitare",
              "opzioni": [
                  "3D Maps",
                  "Aggiornamenti automatici"
              ],
              "prezzo": 1200
          }
      ],
      "prezzo_finale": 45000,
      "sconto": null,
      "usato": null,
      "utente": "Luca Bianchi"
  }
]