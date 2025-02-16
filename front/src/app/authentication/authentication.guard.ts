import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly router: Router,
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const accessToken = localStorage.getItem('accessToken');

        return this.authService.signInWithAccessToken(accessToken)
            .pipe(
                take(1),
                map(() => true),
                catchError(() => {
                    this.router.navigateByUrl('/authentication');
                    return of(false);
                })
            );
    }
}
