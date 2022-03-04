import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    formSignUp = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        private auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
    }

    signUp() {
        const formValue = this.formSignUp.value;
        const { firstName, lastName, email, password } = formValue;

        const user: User = {
            displayName: `${ firstName } ${ lastName }`,
            email,
            password,
            photoURL: null
        };

        this.auth.signUp(user).then((data) => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }

    signInWithPopup() {
        this.auth.signInWithPopup('google');
    }

}
