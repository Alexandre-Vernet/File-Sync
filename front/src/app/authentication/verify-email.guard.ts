import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VerifyEmailGuard implements CanActivate {
    constructor(
        private http: HttpClient,
    ) {
    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


        return this.http.post<boolean>('/api/users/verify-email', {
            email: 'alexandre.vernet@g-mail.fr',
            displayName: 'Alexandre Vernet'
        });
    }
}
