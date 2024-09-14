import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';


describe('AuthService', () => {
  let service: AuthService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['post']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ApiService, useValue: apiSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open login dialog with login action', () => {
    service.loginWithPopup('login');
    expect(matDialogSpy.open).toHaveBeenCalledWith(LoginDialogComponent, { data: { action: 'login' } });
  });

  it('should open login dialog with signup action', () => {
    service.loginWithPopup('signup');
    expect(matDialogSpy.open).toHaveBeenCalledWith(LoginDialogComponent, { data: { action: 'signup' } });
  });

  it('should login and set user', (done: DoneFn) => {
    const mockUser = new User({ username: 'testuser' });
    apiServiceSpy.post.and.returnValue(of(mockUser));

    service.login('testuser', 'password').subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(service['user$'].value).toEqual(mockUser);
      done();
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith(`/login`, { username: 'testuser', password: 'password' });
  });

  it('should register and set user', (done: DoneFn) => {
    const mockUser = new User({ username: 'newuser' });
    apiServiceSpy.post.and.returnValue(of(mockUser));

    service.register('newuser', 'password').subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(service['user$'].value).toEqual(mockUser);
      done();
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith(`/signup`, { username: 'newuser', password: 'password' });
  });

  it('should set user from local storage', () => {
    const mockUser = new User({ username: 'storeduser' });
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    service['loginFromLocalStorage']();

    expect(service['user$'].value).toEqual(mockUser);
  });

  it('should not set user if local storage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    service['loginFromLocalStorage']();

    expect(service['user$'].value).toBeNull();
  });
});
