import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

    emailLocalStorage: string = localStorage.getItem('email');

    formSignIn = new FormGroup({
        email: new FormControl(this.emailLocalStorage, [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    errorMessage: string;

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    signIn(): void {
        const formValue = this.formSignIn.value;
        const { email, password } = formValue;

        this.auth.signInWithEmail(email, password).then(async () => {
            await this.router.navigateByUrl('/');
        }).catch((error) => {
            const errorMsg = this.auth.getCustomErrorMessage(error.code);
            this.formSignIn.controls.email.setErrors({
                'auth': errorMsg
            });
        });
    }

    signInWithPopUp(provider: string) {
        this.auth.signInWithPopup(provider).then(async (a) => {
            console.log(await a);
        }).catch((error) => {
            const errorMsg = this.auth.getCustomErrorMessage(error.code);
            this.formSignIn.controls.email.setErrors({
                'auth': errorMsg
            });
        });
    }
}
