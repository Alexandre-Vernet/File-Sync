import { Injectable } from '@angular/core';
import { getToken } from 'firebase/messaging';
import { environment, messaging } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SnackbarService } from '../public/snackbar/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notificationUri: string = environment.notificationUri();

    constructor(
        private http: HttpClient,
        private snackbar: SnackbarService
    ) {
    }

    getToken(uid: string) {
        getToken(messaging, { vapidKey: environment.vapidKey })
            .then((currentToken) => {
                if (currentToken) {
                    this.storeToken(uid, currentToken).subscribe();
                } else {
                    this.snackbar.displayErrorMessage('No registration token available. Request permission to generate one');
                }
            })
            .catch(() => {
                this.snackbar.displayErrorMessage('An error occurred while retrieving token');
            });
    }

    storeToken(uid: string, token: string,): Observable<void> {
        return this.http.post<void>(this.notificationUri, { uid, token });
    }
}
