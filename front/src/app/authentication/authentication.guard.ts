import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private snackbar: SnackbarService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!accessToken && !refreshToken) {
                this.snackbar.displayErrorMessage('You must be signed in to access this page');
                void this.router.navigateByUrl('/');
                reject(false);
            }

            if (accessToken) {
                return this.auth.signInWithAccessToken(accessToken)
                    .subscribe({
                        next: () => {
                            resolve(true);
                        },
                        error: () => {
                            reject(false);
                            void this.router.navigateByUrl('/');
                        }
                    });
            } else if (refreshToken) {
                return this.auth.getAccessTokenFromRefreshToken().pipe(
                    switchMap((accessToken) => {
                        return this.auth.signInWithAccessToken(accessToken);
                    }),
                    catchError(() => {
                        void this.router.navigateByUrl('/');
                        return of(false);
                    })
                ).subscribe({
                    next: () => {
                        resolve(true);
                    },
                    error: () => {
                        reject(false);
                    }
                });
            } else {
                this.snackbar.displayErrorMessage('You must be signed in to access this page');
                void this.router.navigateByUrl('/');
                return of(false);
            }
        });
    }
}
