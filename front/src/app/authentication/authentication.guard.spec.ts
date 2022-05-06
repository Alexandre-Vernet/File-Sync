import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../environments/environment';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    initializeApp(firebaseConfig);

    TestBed.configureTestingModule({
      providers: [AuthenticationGuard],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
