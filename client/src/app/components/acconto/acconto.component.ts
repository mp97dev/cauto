import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Preventivo } from '../../services/preventivi.service';
import { ValutaUsatoComponent } from '../valuta-usato/valuta-usato.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-acconto',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './acconto.component.html',
  styleUrl: './acconto.component.scss'
})
export class AccontoComponent {
  data: Preventivo = inject(MAT_DIALOG_DATA)
  constructor(
    private dialogRef: MatDialogRef<ValutaUsatoComponent>
  ) {
  }

  form = new FormGroup({
    importo: new FormControl(this.data.acconto ?? 0)
  })

  confirm() {
    this.dialogRef.close(this.form.get('importo')?.value)
  }
}
