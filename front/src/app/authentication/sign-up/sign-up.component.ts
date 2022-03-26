import { Component } from '@angular/core';
import { UserWithPassword } from 'src/app/authentication/user';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    formSignUp = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    signUp() {
        const formValue = this.formSignUp.value;
        const { firstName, lastName, email, password } = formValue;

        const user: UserWithPassword = {
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

    signInWithPopUp(provider: string) {
        this.auth.signInWithPopup(provider).then(async () => {
            await this.router.navigateByUrl('/');
        }).catch((error) => {
            console.error(error);
        });
    }
}
