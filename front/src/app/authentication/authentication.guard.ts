import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private snackbar: SnackbarService,
        private notificationService: NotificationService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise(async (resolve, reject) => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                this.auth.signInWithToken(accessToken)
                    .subscribe({
                        next: (user) => {
                            this.auth.user = user;
                            const uid = user.uid;

                            // Get token for notifications
                            this.notificationService.getToken(uid);
                            resolve(true);
                        },
                        error: () => {
                            this.auth.getAccessTokenFromRefreshToken()
                                .subscribe({
                                    next: (accessToken) => {
                                        this.auth.signInWithToken(accessToken)
                                            .subscribe({
                                                next: (user) => {
                                                    this.auth.user = user;
                                                    resolve(true);
                                                },
                                                error: async () => {
                                                    reject(false);
                                                    this.snackbar.displayErrorMessage('Your session has expired. Please sign in again');
                                                    await this.router.navigateByUrl('/');
                                                }
                                            });
                                    }
                                });
                        }
                    });
            } else {
                reject(false);
                this.snackbar.displayErrorMessage('You must be signed in to access this page');
                await this.router.navigateByUrl('/');
            }
        });
    }
}
