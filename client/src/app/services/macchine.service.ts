import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Car, CarBrand, FlattenBrandCars } from '../models/macchina.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCarDialogComponent } from '../components/add-car-dialog/add-car-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MacchineService {

  private dialog = inject(MatDialog)

  constructor(
    private api: ApiService
  ) { }

  private cars$: BehaviorSubject<CarBrand | null> = new BehaviorSubject<CarBrand | null>(null)
  get carsAsObservable(): Observable<CarBrand> {
    return this.cars$.asObservable().pipe(
      take(1),
      switchMap(
      res => res ? of(res) : this.getCars()
    ))
    // return of(mockData)
  }

  getCars() {
    return this.api.get<CarBrand>(`/macchine`).pipe(
      tap(x => { if (x) this.cars$.next(x) })
    )
  }

  addCarWithDialog() {
    const a = this.dialog.open(AddCarDialogComponent)
    a.afterClosed()

    return a.afterClosed().pipe(
      switchMap((flatCar: FlattenBrandCars) => flatCar ? this.addCar(flatCar) : of(null)),
      tap(() => this.getCars())
    )
  }

  addCar(car: Car | FlattenBrandCars, brand?: keyof CarBrand) {
    const body = brand ? { ...car, marca: brand } : car
    return this.api.post('/macchine', body)
  }

  deleteCar(car: Car, brand: keyof CarBrand) {
    return this.api.delete('/macchine', { marca: brand, modello: car.modello})
  }
}

const mockData = {
  "Ford": [
    {
      "descrizione": "Compatta e dinamica, perfetta per la città.",
      "dimensioni": {
        "altezza": "1476 mm",
        "lunghezza": "4068 mm",
        "peso": "1140 kg",
        "volume_bagagliaio": "292 L"
      },
      "immagini": {
        "colori": [
          "fiesta_giallo.jpg",
          "fiesta_rosso.jpg",
          "fiesta_grigio.jpg"
        ],
        "vista_frontale": "fiesta_frontale.jpg",
        "vista_laterale": "fiesta_laterale.jpg",
        "vista_posteriore": "fiesta_posteriore.jpg"
      },
      "motore": {
        "alimentazione": "Benzina",
        "tipo": "1.0L EcoBoost"
      },
      "modello": "Ford Fiesta 2024",
      "optionals": [
        {
          "nome": "colore",
          "opzioni": [
            "Rosso",
            "Giallo",
            "Bianco",
            "Grigio"
          ],
          "prezzo": 1000
        },
        {
          "nome": "ruota di scorta",
          "opzioni": [],
          "prezzo": 300
        },
        {
          "nome": "ruote maggiorate",
          "opzioni": [
            "17\"",
            "18\"",
            "19\""
          ],
          "prezzo": 400
        },
        {
          "nome": "ruotino di scorta",
          "opzioni": [],
          "prezzo": 150
        }
      ],
      "prezzo_base": 21000
    }
  ],
  "Toyota": [
    {
      "descrizione": "Berlina compatta con ottima efficienza energetica e affidabilità.",
      "dimensioni": {
        "altezza": "1455 mm",
        "lunghezza": "4630 mm",
        "peso": "1315 kg",
        "volume_bagagliaio": "470 L"
      },
      "immagini": {
        "colori": [
          "corolla_rosso.jpg",
          "corolla_blu.jpg",
          "corolla_bianco.jpg"
        ],
        "vista_frontale": "corolla_frontale.jpg",
        "vista_laterale": "corolla_laterale.jpg",
        "vista_posteriore": "corolla_posteriore.jpg"
      },
      "motore": {
        "alimentazione": "Ibrida",
        "tipo": "1.8L 4 cilindri"
      },
      "modello": "Toyota Corolla 2024",
      "optionals": [
        {
          "nome": "colore",
          "opzioni": [
            "Rosso",
            "Blu",
            "Bianco",
            "Nero"
          ],
          "prezzo": 200
        },
        {
          "nome": "interni in pelle",
          "opzioni": [],
          "prezzo": 2000
        },
        {
          "nome": "ruota di scorta",
          "opzioni": [],
          "prezzo": 300
        },
        {
          "nome": "ruote maggiorate",
          "opzioni": [
            "18\"",
            "19\"",
            "20\""
          ],
          "prezzo": 400
        },
        {
          "nome": "vetri oscurati",
          "opzioni": [],
          "prezzo": 500
        },
        {
          "nome": "ruotino di scorta",
          "opzioni": [],
          "prezzo": 150
        }
      ],
      "prezzo_base": 33000
    },
    {
      "descrizione": "SUV spazioso con trazione integrale e tecnologia avanzata.",
      "dimensioni": {
        "altezza": "1690 mm",
        "lunghezza": "4600 mm",
        "peso": "1630 kg",
        "volume_bagagliaio": "580 L"
      },
      "immagini": {
        "colori": [
          "rav4_nero.jpg",
          "rav4_argento.jpg",
          "rav4_verde.jpg"
        ],
        "vista_frontale": "rav4_frontale.jpg",
        "vista_laterale": "rav4_laterale.jpg",
        "vista_posteriore": "rav4_posteriore.jpg"
      },
      "motore": {
        "alimentazione": "Ibrida",
        "tipo": "2.5L 4 cilindri"
      },
      "modello": "Toyota RAV4 2024",
      "optionals": [
        {
          "nome": "colore",
          "opzioni": [
            "Nero",
            "Argento",
            "Verde",
            "Bianco Perla"
          ],
          "prezzo": 200
        },
        {
          "nome": "interni in pelle",
          "opzioni": [],
          "prezzo": 2000
        },
        {
          "nome": "ruota di scorta",
          "opzioni": [],
          "prezzo": 300
        },
        {
          "nome": "ruote_maggiorate",
          "opzioni": [
            "18\"",
            "19\"",
            "20\""
          ],
          "prezzo": 400
        },
        {
          "nome": "vetri oscurati",
          "opzioni": [],
          "prezzo": 500
        }
      ],
      "prezzo_base": 41700
    }
  ]
}
