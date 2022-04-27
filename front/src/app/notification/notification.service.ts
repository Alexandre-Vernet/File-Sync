import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly publicKey = 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU';


    constructor(
        private http: HttpClient,
        private swPush: SwPush,
        private snackBar: MatSnackBar
    ) {
    }

    subscribeNotification() {
        if (!this.swPush.isEnabled) {
            this.snackBar.open('Your browser does not support push notifications', 'OK', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 4000,
            });

            // Ask notification permission
            this.swPush.requestSubscription({
                serverPublicKey: this.publicKey
            }).catch(() => {
                this.snackBar.open('\'You have not granted permission to receive notifications\'', 'OK', {
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 4000,
                });
            });
        }
    }
}
