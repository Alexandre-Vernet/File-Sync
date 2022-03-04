import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    constructor(
        private auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
    }

    signIn() {
        const email = 'alexandre.vernet@g-mail.fr';
        const pswd = 'alexandre';
        this.auth.signIn(email, pswd).then((user) => {
            console.log(user);
        }).catch((error) => {
            console.error(error);
        });
    }

}
