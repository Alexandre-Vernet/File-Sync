import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPipe } from '../authentication.pipe';
import { DialogResetPasswordComponent } from '../dialog-reset-password/dialog-reset-password.component';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    formSignIn = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private dialog: MatDialog,
    ) {
    }

    async ngOnInit() {
        // Try to access the file page
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            await this.router.navigateByUrl('/file');
        }
    }

    signIn(): void {
        const formValue = this.formSignIn.value;
        const { email, password } = formValue;

        this.auth.signInWithEmail(email, password)
            .then(async () => {
                await this.router.navigateByUrl('/file');
            })
            .catch(error => {
                const errorMsg = new AuthenticationPipe().getCustomErrorMessage(error.code);
                if (errorMsg === '') {
                    this.formSignIn.controls.email.setErrors({
                        'auth': error
                    });
                }
                this.formSignIn.controls.email.setErrors({
                    'auth': errorMsg
                });

                this.focusOnEmailInput();
            });
    }

    signInWithPopUp(provider: string) {
        this.auth.signInWithPopup(provider)
            .then(async () => {
                await this.router.navigateByUrl('/file');
            })
            .catch(error => {
                const errorMsg = new AuthenticationPipe().getCustomErrorMessage(error.code);
                this.formSignIn.controls.email.setErrors({
                    'auth': errorMsg
                });

                this.focusOnEmailInput();
            });
    }

    focusOnEmailInput() {
        this.formSignIn.controls.email.markAsTouched();
    }

    resetPassword() {
        this.dialog.open(DialogResetPasswordComponent);
    }
}

