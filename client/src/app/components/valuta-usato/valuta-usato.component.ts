import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Preventivo } from '../../services/preventivi.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-valuta-usato',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe
  ],
  templateUrl: './valuta-usato.component.html',
  styleUrl: './valuta-usato.component.scss'
})
export class ValutaUsatoComponent {
  data: Preventivo = inject(MAT_DIALOG_DATA)
  constructor(
    private dialogRef: MatDialogRef<ValutaUsatoComponent>
  ) {}

  form = new FormGroup({
    valutazione: new FormControl(0)
  })

  confirm() {
    this.dialogRef.close(this.form.get('valutazione')?.value)
  }
}
