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
        private auth: AuthenticationService
    ) {
    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise(async (resolve, reject) => {
            const customToken = localStorage.getItem('customToken');

            if (customToken) {
                this.auth.signInWithToken(customToken).then((user) => {
                    console.log(user);
                    if (user.emailVerified) {
                        resolve(true);
                    } else {
                        this.http.post<boolean>('/api/users/verify-email', { user }).subscribe(() => {
                            resolve(true);
                        }, async () => {
                            await this.router.navigateByUrl('/authentication/verify-email');
                            reject(false);
                        });
                    }
                });
            }
        });
    }
}
