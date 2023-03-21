import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPipe } from '../authentication.pipe';

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

    ngOnInit() {
        // Try to access the file page
        this.router.navigateByUrl('/file');
    }

    signIn(): void {
        const formValue = this.formSignIn.value;
        const { email, password } = formValue;

        this.auth.signInWithEmail(email, password)
            .then(async () => {
                await this.router.navigateByUrl('/file');
            })
            .catch((error) => {
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
        this.dialog.open(DialogResetPasswordFileComponent);
    }
}


@Component({
    template: `
        <h1 mat-dialog-title>Reset password</h1>
        <div mat-dialog-content>
            <mat-form-field appearance="fill">
                <mat-label>Email</mat-label>
                <input (keydown)="submitWithEnterKey($event)" matInput placeholder="john.doe@gmail.com"
                       [formControl]="formResetPassword" required>
                <mat-error *ngIf="formResetPassword.invalid">{{ getErrorMessage() }}</mat-error>
            </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="primary" (click)="resetPassword()" [disabled]="!formResetPassword.valid"
                    [mat-dialog-close]="true">
                Send email
            </button>
        </div>
    `,
})
export class DialogResetPasswordFileComponent {

    formResetPassword = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private auth: AuthenticationService,
    ) {
    }

    resetPassword() {
        const email = this.formResetPassword.value;
        this.auth.resetPassword(email);
    }

    getErrorMessage(): string {
        if (this.formResetPassword.hasError('required')) {
            return 'You must enter a value';
        }
        if (this.formResetPassword.hasError('email')) {
            return 'Not a valid email';
        }

        return this.formResetPassword.hasError('empty') ? 'You must enter a value' : '';
    }

    submitWithEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter' && event.ctrlKey && this.formResetPassword.valid) {
            this.resetPassword();
        }
    }
}

