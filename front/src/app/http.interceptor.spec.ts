import { TestBed } from '@angular/core/testing';

import { HttpInterceptor } from './http.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('HttpInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            HttpInterceptor
        ],
        imports: [
            MatSnackBarModule
        ]
    }));

    it('should be created', () => {
        const interceptor: HttpInterceptor = TestBed.inject(HttpInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
