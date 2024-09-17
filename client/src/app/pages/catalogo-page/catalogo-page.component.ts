import { Component, inject } from '@angular/core';
import { MacchineService } from '../../services/macchine.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { CarBrand } from '../../models/macchina.model';
import { MacchinaComponent } from '../../components/macchina/macchina.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    MacchinaComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './catalogo-page.component.html',
  styleUrl: './catalogo-page.component.scss'
})
export class CatalogoPageComponent {
  public macchine = inject(MacchineService).carsAsObservable.pipe(tap(
    cars => this.brands = Object.keys(cars)
  ))

  brands: Array<keyof CarBrand> = []

  brandFilter = new FormControl([] as Array<keyof CarBrand>)
}
