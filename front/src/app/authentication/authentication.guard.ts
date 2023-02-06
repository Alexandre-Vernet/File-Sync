import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SnackbarService } from '../public/snackbar/snackbar.service';

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
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token');

            if (token) {
                this.auth.signInWithToken(token)
                    .subscribe({
                        next: (user) => {
                            this.auth.user = user;
                            resolve(true);
                        },
                        error: async () => {
                            reject(false);
                            localStorage.removeItem('token');
                            this.snackbar.displayErrorMessage('Your session has expired. Please sign in again.');
                            await this.router.navigateByUrl('/authentication/sign-in');
                        }
                    });
            } else {
                reject(false);
                this.snackbar.displayErrorMessage('You must be signed in to access this page.');
                await this.router.navigateByUrl('authentication/sign-in');
            }
        });
    }
}
