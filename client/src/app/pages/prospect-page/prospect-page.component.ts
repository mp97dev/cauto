import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MacchineService } from '../../services/macchine.service';
import { Car, CarBrand, Optional } from '../../models/macchina.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { switchMap, take, tap } from 'rxjs';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from "@angular/material/list";
import { WithOptionsPipe } from '../../pipes/with-options.pipe';
import { ApiService } from '../../services/api.service';
import { SumOptionalsPipe } from '../../pipes/sum-optionals.pipe';
import { Sede, SediService } from '../../services/sedi.service';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { IncludedInArrayPipe } from '../../pipes/included-in-array.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



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
    AsyncPipe,
    SumOptionalsPipe,
    WithOptionsPipe,
    MatInputModule,
    MatChipsModule,
    IncludedInArrayPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './prospect-page.component.html',
  styleUrl: './prospect-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProspectPageComponent implements OnInit {

  announcer = inject(LiveAnnouncer);
  step = signal(0)
  urls = signal([] as string[])

  sedi = inject(SediService).sedi

  private auth = inject(AuthService)
  
  constructor(
    public ms: MacchineService,
    private api: ApiService,
    private router: Router
  ) {}
  
  form = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modello: new FormControl('', [Validators.required]),
    optionals: new FormControl([] as Optional[], [singleOptionValidator]),
    usato: new FormControl(''),
    immagini: new FormControl([] as any),
    luogo_ritiro: new FormControl(null as Sede | null, [Validators.required]),
  })
  
  cars: CarBrand = {}
  brands: Array<keyof CarBrand> = []
  models: Car[] = []
  selectedModel: Car | null = null

  optionalsArray: Optional[] = []


  ngOnInit(): void {
    this.ms.carsAsObservable.pipe(tap(cars => {
      this.brands = Object.keys(cars)
      this.cars = cars
    })).subscribe()

    this.form.get('marca')?.valueChanges.subscribe(marca => {
      this.models = this.cars[marca as unknown as keyof CarBrand]
      const sameBrandModel = this.models.find(car => car.modello === this.form.get('modello')?.value)
      if (!sameBrandModel) {
        this.form.get('modello')?.reset()
      }
    })
    this.form.get('modello')?.valueChanges.subscribe(modello => {
      this.selectedModel = this.models.find(car => car.modello === modello) || null

      // salva optionals del modello
      this.optionalsArray = JSON.parse(JSON.stringify(this.selectedModel?.optionals ?? []))
      this.selectedModel?.optionals.forEach(o => o.opzioni = [])
    })

  }


  setStep(val: number) {
    this.step.set(val)
  }

  send() {

    const value = {
      marca: this.form.get('marca')?.value![0],
      modello: this.form.get('modello')?.value,
      optionals: this.form.get('optionals')?.value,
      usato: {
        descrizione: this.form.get('usato')?.value,
        immagini: this.form.get('immagini')?.value
      },
      luogo_ritiro: this.form.get('luogo_ritiro')?.value
    }

    this.selectedOptionals.forEach(([valore, nome]) => {
      const optional = value.optionals?.find(opt => opt.nome === nome)
      if(optional) optional.opzioni.push(valore)
    })

    this.auth.user.pipe(
      switchMap((user: User | null) => {
        if(user) {
          return this.api.post(`/preventivi`, value)
          .pipe(
            tap(() => this.router.navigate(['/dashboard']))
          )
        }
        else return this.auth.loginWithPopup("login").pipe(tap(() => this.send()))
      }),
      take(1)
    ).subscribe()


  }

  removeUrl(url: string) {
    this.urls.update(urls => {
      const index = urls.indexOf(url);
      if (index < 0) {
        return urls;
      }

      urls.splice(index, 1);
      this.announcer.announce(`removed ${urls}`);
      return [...urls];
    });
  }

  addUrl(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.urls.update(urls => [...urls, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  selectedOptionals: [string, string][] = []
  changeOptionalValue(event: MatSelectChange, optionalName: string) {
    this.selectedOptionals.push([event.value, optionalName])
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
