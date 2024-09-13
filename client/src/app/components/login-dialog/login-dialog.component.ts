import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { catchError, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule,  MatButtonModule ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {

  public readonly action

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {action: 'login' | 'signup'},
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthService
  ) {
    this.action = data.action
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  onSubmit() {
    if(!this.form.valid) throw new Error('Invalid login form')
    const value = this.form.value

    const sub = this.action === 'login' ? this.auth.login(value.username ?? '', value.password ?? '') : this.auth.register(value.username ?? '', value.password ?? '')
    sub.pipe(

      catchError(err => {console.log(err); return of(null)})
    ).subscribe()
  }


}
