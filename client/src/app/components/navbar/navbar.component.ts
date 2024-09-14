import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ AsyncPipe, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    public auth: AuthService,
  ) {}

  login() {
    this.auth.loginWithPopup()
  }
  signup() {
    this.auth.loginWithPopup('signup')
  }

  logout() {
    this.auth.logout()
  }

}
