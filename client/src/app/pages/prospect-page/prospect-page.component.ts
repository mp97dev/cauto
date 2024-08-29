import { Component, OnInit } from '@angular/core';
import { MacchineService } from '../../services/macchine.service';
import { Observable, of, tap } from 'rxjs';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IOptionals, Macchina } from '../../models/macchina.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prospect-page',
  standalone: true,
  imports: [ FormsModule, MatIconModule, MatInputModule, CommonModule ],
  templateUrl: './prospect-page.component.html',
  styleUrl: './prospect-page.component.scss'
})
export class ProspectPageComponent implements OnInit{

  constructor(
    private ms: MacchineService
  ) {
    this.cars = of([])
  }

  loading = true
  cars: Observable<Macchina[]>
  preventivo = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modello: new FormControl('', [Validators.required]),
    optionals: new FormControl([] as IOptionals[])
  })

  ngOnInit(): void {
    this.ms.getCars().pipe(tap(x => this.loading = false)).subscribe()
    this.cars = this.ms.carsAsObservable    
  }

  addUsato() {
    
  }
}
