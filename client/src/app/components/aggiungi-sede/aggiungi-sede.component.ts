import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-aggiungi-sede',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './aggiungi-sede.component.html',
  styleUrl: './aggiungi-sede.component.scss'
})
export class AggiungiSedeComponent {

  constructor(
    private dialogRef: MatDialogRef<AggiungiSedeComponent>
  ) {}

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    indirizzo: new FormControl('', [Validators.required])
  })

  confirm() {
    if(this.form.invalid) return;
    this.dialogRef.close(this.form.value)
  }
}
