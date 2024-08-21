import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private as: AuthService
  ) {}

  form = new FormGroup({
    login: new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }),
    registration: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    }),
  });

  get lusr() {return this.loginGroup?.get('username')}
  get lpsw() {return this.loginGroup?.get('password')}

  get loginGroup() {
    return this.form.get('login');
  }
  get registrationGroup() {
    return this.form.get('registration');
  }

  ngOnInit(): void {
    this.loginGroup?.valueChanges.subscribe((x) =>
      console.log(this.loginGroup?.valid)
    );
  }

  login() {
    // if(this.loginGroup?.valid) this.as.login(this.loginGroup.value as {username: string, password: string})
    if (this.loginGroup?.valid)
      this.as
        .login(this.loginGroup.value as { username: string; password: string })
        .pipe(
          tap((x) => {
            console.log({...this.loginGroup?.errors, wrongCreds: true});  
            if (!x) {
              
              this.loginGroup?.setErrors({
                ...this.loginGroup.errors,
                wrongCreds: true,
              });
            }
            if(x?.loggedIn) this.dialogRef.close()
          })
        )
        .subscribe();
  }

  register() {
    if (this.registrationGroup?.valid)
      this.as
        .register(
          this.registrationGroup.value as {
            username: string;
            password: string;
            email: string;
          }
        )
        .pipe(
          tap((x) => {
            if (!x)
              this.loginGroup?.setErrors({
                ...this.loginGroup.errors,
                wrongCreds: true,
              });
            if(x?.loggedIn) this.dialogRef.close()
          })
        )
        .subscribe();
  }
}
