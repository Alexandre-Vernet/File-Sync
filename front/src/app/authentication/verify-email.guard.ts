import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class VerifyEmailGuard implements CanActivate {
    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthenticationService,
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise(async (resolve) => {
            const token = localStorage.getItem('token');

            if (token) {
                this.auth.signInWithToken(token).subscribe(async (user) => {
                    console.log(user);
                    if (user.emailVerified) {
                        resolve(true);
                    } else {
                        await this.router.navigateByUrl('/authentication/verify-email');
                    }
                });
            } else {
                await this.router.navigateByUrl('/authentication/sign-in');
                resolve(false);
            }
        });
    }
}
