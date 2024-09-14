import { Component, inject } from '@angular/core';
import { MacchineService } from '../../services/macchine.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { CarBrand } from '../../models/macchina.model';
import { MacchinaComponent } from '../../components/macchina/macchina.component';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    MacchinaComponent
  ],
  templateUrl: './catalogo-page.component.html',
  styleUrl: './catalogo-page.component.scss'
})
export class CatalogoPageComponent {
  public macchine = inject(MacchineService).carsAsObservable.pipe(tap(
    cars =>  this.brands = Object.keys(cars)
  ))
  brands: Array<keyof CarBrand> = []
}
