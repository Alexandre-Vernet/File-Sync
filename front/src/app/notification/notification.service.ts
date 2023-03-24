import { Injectable } from '@angular/core';
import { getToken } from 'firebase/messaging';
import { environment, messaging } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notificationUri: string = environment.notificationUri();

    constructor(
        private http: HttpClient
    ) {
    }

    getToken(uid: string) {
        getToken(messaging, { vapidKey: environment.vapidKey })
            .then((currentToken) => {
                if (currentToken) {
                    console.log('current token for client: ', currentToken);
                    this.storeToken(uid, currentToken).subscribe();
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    storeToken(uid: string, token: string,): Observable<void> {
        return this.http.post<void>(this.notificationUri, { uid, token });
    }
}
