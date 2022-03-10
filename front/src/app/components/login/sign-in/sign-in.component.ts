import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    formSignIn = new FormGroup({
        email: new FormControl('alexandre.vernet@g-mail.fr', [Validators.required, Validators.email]),
        password: new FormControl('alexandre', [Validators.required])
    });

    constructor(
        private auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
    }

    signIn(): void {
        const formValue = this.formSignIn.value;
        const { email, password } = formValue;

        this.auth.signIn(email, password).then((user) => {
            console.log(user);
        }).catch((error) => {
            console.error(error);
        });
    }

}
