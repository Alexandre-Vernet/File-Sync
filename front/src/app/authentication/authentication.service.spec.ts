import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../environments/environment';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {

        // Initialize Firebase
        initializeApp(firebaseConfig);

        TestBed.configureTestingModule({
            providers: [AuthenticationService],
            imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule]
        });
        service = TestBed.inject(AuthenticationService);


    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
