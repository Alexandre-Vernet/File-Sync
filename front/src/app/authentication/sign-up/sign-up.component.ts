import { Component } from '@angular/core';
import { UserWithPassword } from 'src/app/authentication/user';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationPipe } from '../authentication.pipe';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    formSignUp = new FormGroup({
        displayName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    });

    constructor(
        private auth: AuthenticationService,
        private router: Router,
    ) {
    }

    signUp() {
        const formValue = this.formSignUp.value;
        const { displayName, email, password } = formValue;

        const user: UserWithPassword = {
            displayName,
            email,
            password,
            photoURL: null
        };

        this.auth.signUp(user)
            .subscribe({
                next: () => {
                    this.auth.signInWithEmail(user.email, user.password)
                        .then(async () => {
                            await this.router.navigateByUrl('/file');
                        })
                        .catch(error => {
                            const errorMsg = new AuthenticationPipe().getCustomErrorMessage(error.code);
                            this.formSignUp.controls.email.setErrors({
                                'auth': errorMsg
                            });
                        });
                },
                error: (error) => {
                    this.formSignUp.controls.email.setErrors({
                        'auth': error.error.message
                    });
                }
            });
    }

    signInWithPopUp(provider: string) {
        this.auth.signInWithPopup(provider)
            .then(async () => {
                await this.router.navigateByUrl('/file');
            })
            .catch(error => {
                const errorMsg = new AuthenticationPipe().getCustomErrorMessage(error.code);
                this.formSignUp.controls.email.setErrors({
                    'auth': errorMsg
                });

                this.focusOnEmailInput();
            });
    }

    focusOnEmailInput() {
        this.formSignUp.controls.email.markAsTouched();
    }
}
