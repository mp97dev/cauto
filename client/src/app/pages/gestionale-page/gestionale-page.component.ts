import { Component, inject } from '@angular/core';
import { MacchineService } from '../../services/macchine.service';
import { map, Observable } from 'rxjs';
import { CarBrand, FlattenBrandCars } from '../../models/macchina.model';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gestionale-page',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './gestionale-page.component.html',
  styleUrl: './gestionale-page.component.scss'
})
export class GestionalePageComponent {
  private cs = inject(MacchineService)
  public cars: Observable<FlattenBrandCars[]> = this.cs.carsAsObservable.pipe(map(cars => this.flattenBrand(cars)))

  columns = ['marca', 'modello', 'descrizione']
  displayColumns = [...this.columns, 'prezzo_base', 'sconto', 'motore', 'dimensioni', 'optionals', 'azioni']


  public addCar() {
    this.cs.addCarWithDialog().subscribe()
  }

  public removeCar(car: FlattenBrandCars) {
    this.cs.deleteCar(car, car.marca).subscribe()
  }

  constructor() { }

  flattenBrand(obj: CarBrand): FlattenBrandCars[] {
    return Object.entries(obj).flatMap(([brand, cars]) => cars.map(car => ({ ...car, marca: brand })))
  }
}