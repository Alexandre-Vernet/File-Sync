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
        fullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    });

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    signUp() {
        const formValue = this.formSignUp.value;
        const { fullName, email, password } = formValue;

        const user: UserWithPassword = {
            displayName: fullName,
            email,
            password,
            photoURL: null
        };

        this.auth.signUp(user).then(async () => {
            await this.router.navigateByUrl('/');
        }).catch(error => {
            this.auth.customErrorMessage(error.code).then((message) => {
                this.formSignUp.controls.email.setErrors({
                    'auth': message
                });
            }).catch(() => {
                this.formSignUp.controls.email.setErrors({
                    'auth': error.message
                });
            });
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
