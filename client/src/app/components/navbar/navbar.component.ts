import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ AsyncPipe, RouterModule, MatButtonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  readonly auth = inject(AuthService)
  constructor(
  ) {}

  user = this.auth.user

  login() {
    this.auth.loginWithPopup().subscribe()
  }
  signup() {
    this.auth.loginWithPopup('signup').subscribe()
  }

  logout() {
    this.auth.logout()
  }

}
