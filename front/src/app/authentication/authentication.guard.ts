import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise(async (resolve, reject) => {
            const customToken = localStorage.getItem('customToken');

            if (customToken) {
                this.auth.signInWithToken(customToken).then((u) => {
                    console.log(u);
                    resolve(true);
                }).catch(async () => {
                    localStorage.removeItem('token');
                    await this.router.navigateByUrl('/authentication/sign-in');
                    reject(false);
                });
            } else {
                await this.router.navigateByUrl('authentication/sign-in');
                reject(false);
            }
        });
    }
}