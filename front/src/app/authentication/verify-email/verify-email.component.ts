import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    template: `
        <h2 mat-dialog-title>Verify email</h2>
        <mat-dialog-content class="mat-typography">
            <h3> Please, check your email for the activation link.</h3>
            <p>Then, press refresh button</p>
        </mat-dialog-content>
        <mat-dialog-actions class="ion-justify-content-end">
            <button mat-button (click)="redirectToSignIn()" [mat-dialog-close]="true">Cancel</button>
            <button mat-button (click)="checkIfEmailIsVerified()" cdkFocusInitial>Refresh</button>
        </mat-dialog-actions>
    `,
})
export class DialogVerifyEmailComponent {

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private snackbar: SnackbarService,
    ) {
    }

    async checkIfEmailIsVerified() {
        const token = localStorage.getItem('token');

        this.auth.signInWithToken(token)
            .subscribe({
                next: (user) => {
                    console.log(user);
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
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.openDialogVerifyEmail();
    }

    openDialogVerifyEmail() {
        this.dialog.open(DialogVerifyEmailComponent);
    }
}
