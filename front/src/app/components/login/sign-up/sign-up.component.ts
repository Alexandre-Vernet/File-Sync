import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    constructor(
        private auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
    }

    signUp() {
        const email = 'alexandre.vernet@g-mail.fr';
        const password = 'alexandre';
        this.auth.signUp(email, password).then(() => {
            console.log('sign up success');
        }).catch(error => {
            console.log('sign up error', error);
        });
    }

}
