import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly router: Router,
        private readonly snackbar: SnackbarService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            this.snackbar.displayErrorMessage('You must be signed in to access this page');
            this.router.navigateByUrl('/');
        }

        return this.authService.signInWithAccessToken(accessToken)
            .pipe(
                map(() => true),
                catchError(() => {
                    this.router.navigateByUrl('/');
                    return of(false);
                })
            );
    }
}
