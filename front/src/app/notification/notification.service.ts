import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserWithId } from '../authentication/user';
import { Observable } from 'rxjs';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    user: UserWithId;

    constructor(
        private http: HttpClient,
        private swPush: SwPush,
        private auth: AuthenticationService,
        private snackbar: SnackbarService
    ) {
        this.auth.getAuth().then(async (user) => {
            this.user = user;
        });
    }

    subscribeNotification() {
        if (!this.swPush.isEnabled) {
            this.snackbar.displayErrorMessage('Your browser does not support push notifications');
        }

        // Ask notification permission
        this.swPush.requestSubscription({
            serverPublicKey: environment.publicKey
        }).then((subs) => {
            this.storeSubs(subs).subscribe(() => {
                localStorage.setItem('subs', JSON.stringify(subs));
            });
        }).catch(() => {
            this.snackbar.displayErrorMessage('You have not granted permission to receive notifications');
        });
    }

    storeSubs(subs: PushSubscription): Observable<any> {
        return this.http.post('/api/notifications', {
            subs, uid: this.user.uid
        });
    }
}
