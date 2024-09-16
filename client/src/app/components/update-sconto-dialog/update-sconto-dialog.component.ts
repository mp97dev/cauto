import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-sconto-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './update-sconto-dialog.component.html',
  styleUrl: './update-sconto-dialog.component.scss'
})
export class UpdateScontoDialogComponent {

  data: number = inject(MAT_DIALOG_DATA)

  constructor(
    private dialogRef: MatDialogRef<UpdateScontoDialogComponent>
  ) {}

  newSconto = new FormControl(this.data)

  confirm() {
    this.dialogRef.close(this.newSconto.value)
  }
}
