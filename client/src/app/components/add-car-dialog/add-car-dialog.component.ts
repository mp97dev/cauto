import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MacchineService } from '../../services/macchine.service';
import { map } from 'rxjs';
import { CarBrand, FlattenBrandCars } from '../../models/macchina.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './add-car-dialog.component.html',
  styleUrl: './add-car-dialog.component.scss'
})
export class AddCarDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AddCarDialogComponent>
  ) {
  }

  public brands = inject(MacchineService).carsAsObservable.pipe(map((car: CarBrand) => Object.keys(car)))

  form = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    dimensioni: new FormGroup({
      altezza: new FormControl('', [Validators.required]),
      lunghezza: new FormControl('', [Validators.required]),
      larghezza: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      volume_bagagliaio: new FormControl('', [Validators.required]),
    }),
    immagini: new FormGroup({
      colori: new FormArray([]),
      vista_frontale: new FormControl('', [Validators.required]),
      vista_laterale: new FormControl('', [Validators.required]),
      vista_posteriore: new FormControl('', [Validators.required]),
    }),
    motore: new FormGroup({
      alimentazione: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    }),
    modello: new FormControl('', [Validators.required]),
    optionals: new FormArray([]),
    prezzo_base: new FormControl('', [Validators.required]),
  })

  get dimensioni() {
    return this.form.get('dimensioni') as FormGroup
  }

  get motore() {
    return this.form.get('motore') as FormGroup
  }

  get immagini() {
    return this.form.get('immagini') as FormGroup
  }
  get immaginiColori() {
    return this.immagini.get('colori') as FormArray
  }

  get optionals() {
    return this.form.get('optionals') as FormArray
  }

  addImmagniColori(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.immaginiColori.push(new FormControl('', [Validators.required]))
  }
  removeImmagniColori(index: number) {
    this.immaginiColori.removeAt(index)
  }

  
  send() {
    this.dialogRef.close(this.form.value)
  }
  
  // OPTIONALS
  addOptional(e: Event) {
    e.preventDefault()
    e.stopPropagation()

    this.optionals.push(new FormGroup({
      nome: new FormControl('', [Validators.required]),
      prezzo: new FormControl('', [Validators.required]),
      opzioni: new FormControl([])
    }))
  }
  // OPTIONALS-OPZIONI
  removeOption(optionalGroup: AbstractControl, index: number ) {
    const o = optionalGroup.get('opzioni')
    if(!o) return;
    o.setValue((o.value as string[]).splice(index, 1))
  }
  addOption(optionalGroup: AbstractControl, e: MatChipInputEvent) {
    const o = optionalGroup.get('opzioni')
    if(!o) return;
    o.setValue([...(o.value as string[]), e.value])
    e.chipInput!.clear()

  }

}
