import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { UserWithId } from '../authentication/user';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly publicKey = 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU';


    constructor(
        private http: HttpClient,
        private swPush: SwPush
    ) {
    }

    subscribeNotification(user: UserWithId) {
        if (!this.swPush.isEnabled) {
            console.log('Your browser does not support push notifications');
        }

        // Ask notification permission
        this.swPush.requestSubscription({
            serverPublicKey: this.publicKey
        })
            .then(subscription => {
                const sub = subscription.toJSON();

                // Send sub to server
                this.http.post('/api/notifications/sendNotification', { uid: user.uid, sub });
            }).catch(error => {
            console.error(error);
        });
    }
}
