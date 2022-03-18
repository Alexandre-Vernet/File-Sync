import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const token = localStorage.getItem('token');
        if (token) {
            this.auth.signInWithToken(token).then((user) => {
                this.router.navigateByUrl('/');
            }).catch(() => {
                this.router.navigateByUrl('/sign-in');
            });
        } else {
            this.router.navigateByUrl('/sign-in');
        }
    }
}
