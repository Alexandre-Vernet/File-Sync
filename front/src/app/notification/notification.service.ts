import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { HttpInterceptor } from '../http.interceptor';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly publicKey = 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU';


    constructor(
        private http: HttpClient,
        private swPush: SwPush,
        private httpInterceptor: HttpInterceptor
    ) {
    }

    subscribeNotification() {
        if (!this.swPush.isEnabled) {
            this.httpInterceptor.displayErrorMessage('Your browser does not support push notifications');
        }

        // Ask notification permission
        this.swPush.requestSubscription({
            serverPublicKey: this.publicKey
        }).catch(() => {
            this.httpInterceptor.displayErrorMessage('You have not granted permission to receive notifications');
        });
    }
}
