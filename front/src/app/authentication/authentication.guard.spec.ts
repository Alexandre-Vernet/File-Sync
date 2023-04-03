import { TestBed } from '@angular/core/testing';
import { AuthenticationGuard } from './authentication.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AuthenticationGuard', () => {
    let guard: AuthenticationGuard;

    beforeEach(() => {

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
