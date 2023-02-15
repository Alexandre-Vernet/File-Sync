import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    templateUrl: './verify-email.component.html',
})
export class DialogVerifyEmailComponent implements OnInit {

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private snackbar: SnackbarService,
    ) {
    }

    async ngOnInit() {
        await this.checkIfEmailIsVerified();
    }

    async checkIfEmailIsVerified() {
        const token = localStorage.getItem('token');

        this.auth.signInWithToken(token)
            .subscribe({
                next: (user) => {
                    console.log('user.emailVerified', user.emailVerified);
                    if (user.emailVerified) {
                        this.router.navigateByUrl('/file');
                    } else {
                        this.auth.verifyEmail(user)
                            .subscribe({
                                next: () => {
                                    this.snackbar.displaySuccessMessage('Verification email sent.');
                                },
                                error: () => {
                                    this.snackbar.displayErrorMessage('Verification email failed to send.');
                                }
                            });
                    }
                },
                error: async () => {
                    this.snackbar.displayErrorMessage('Your session has expired. Please sign in again.');
                    await this.router.navigateByUrl('/authentication/sign-in');
                }
            });
    }

    async redirectToSignIn() {
        await this.router.navigateByUrl('/authentication/sign-in');
    }
}

@Component({
    selector: 'app-verify-email',
    template: '',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {
        this.openDialogVerifyEmail();
    }

    openDialogVerifyEmail() {
        this.dialog.open(DialogVerifyEmailComponent);
    }
}
