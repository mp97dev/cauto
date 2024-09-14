import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MacchineService } from '../../services/macchine.service';
import { Car, CarBrand, Optional } from '../../models/macchina.model';
import { MatSelectModule } from '@angular/material/select'
import { tap } from 'rxjs';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from "@angular/material/list";
import { WithOptionsPipe } from '../../pipes/with-options.pipe';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment.development';
import { SumOptionalsPipe } from '../../pipes/sum-optionals.pipe';
import { Sede, SediService } from '../../services/sedi.service';


@Component({
  selector: 'app-prospect-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    JsonPipe,
    SumOptionalsPipe,
    WithOptionsPipe,
    MatInputModule
  ],
  templateUrl: './prospect-page.component.html',
  styleUrl: './prospect-page.component.scss'
})
export class ProspectPageComponent implements OnInit {

  step = signal(0)

  
  constructor(
    public ms: MacchineService,
    private api: ApiService,
  ) {}
  
  form = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modello: new FormControl('', [Validators.required]),
    optionals: new FormControl([] as Optional[], [singleOptionValidator]),
    usato: new FormControl(''),
    immagini: new FormControl([] as any),
  })
  
  cars: CarBrand = {}
  brands: Array<keyof CarBrand> = []
  models: Car[] = []
  selectedModel: Car | null = null

  optionalSettings: Optional[] = []


  ngOnInit(): void {
    this.ms.carsAsObservable.pipe(tap(cars => {
      console.log(cars)
      this.brands = Object.keys(cars)
      this.cars = cars
    })).subscribe()

    this.form.get('marca')?.valueChanges.subscribe(marca => {
      this.models = this.cars[marca as unknown as keyof CarBrand]
      const sameBrandModel = this.models.find(car => car.nome_univoco === this.form.get('modello')?.value)
      if (!sameBrandModel) {
        this.form.get('modello')?.reset()
      }
    })
    this.form.get('modello')?.valueChanges.subscribe(modello => {
      this.selectedModel = this.models.find(car => car.nome_univoco === modello) || null
    })

    this.form.get('optionals')?.valueChanges.subscribe(optionals => {
      
      this.optionalSettings = JSON.parse(JSON.stringify(optionals))
      if(optionals?.some(o => o.opzioni.length > 1)) {
        this.form.get('optionals')?.setValue(optionals.map(o => {o.opzioni = []; return o}))
        return
      }
      })

  }


  setStep(val: number) {
    this.step.set(val)
  }

  send() {
        
    const value = {
      marca: this.form.get('marca')?.value,
      modello: this.form.get('modello')?.value,
      optionals: this.form.get('optionals')?.value,
      usato: {
        descrizione: this.form.get('usato')?.value,
        immagini: [] //!
      }
    }

    this.api.post(`/prospect`, value).subscribe()
  }

}

export const singleOptionValidator: ValidatorFn = (control: AbstractControl) =>  {
  if (!control.value) {
    return null
  }

  const value = control.value as Optional[]

  if (value.some(x => x.opzioni.length > 1)) {
    return { tooMany: true }
  }

  return null
}
