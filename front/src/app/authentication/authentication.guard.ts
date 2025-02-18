import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError, take } from 'rxjs/operators';


export const authenticationGuard = (): Observable<boolean> => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const accessToken = localStorage.getItem('accessToken');

    return authService.signInWithAccessToken(accessToken)
        .pipe(
            take(1),
            map(() => true),
            catchError(() => {
                router.navigateByUrl('/authentication');
                return of(false);
            })
        );
}

