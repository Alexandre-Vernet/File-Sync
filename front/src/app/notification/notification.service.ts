import { Injectable } from '@angular/core';
import { getToken } from 'firebase/messaging';
import { environment, messaging } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notificationUri: string = `${ environment.backendUrl }/notifications`;

    constructor(
        private http: HttpClient
    ) {
    }

    getToken() {
        getToken(messaging, { vapidKey: environment.vapidKey })
            .then((currentToken) => {
                if (currentToken) {
                    console.log('current token for client: ', currentToken);
                    this.http.post(this.notificationUri, { token: currentToken });
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}
