import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private auth: AuthenticationService,
        private router: Router,
        private snackbar: SnackbarService,
    ) {
    }

    ngOnInit(): void {
        this.checkIfEmailIsVerified();
    }

    checkIfEmailIsVerified() {
        const customToken = localStorage.getItem('customToken');

        if (customToken) {
            this.auth.signInWithToken(customToken).then(async (user) => {
                if (user.emailVerified) {
                    this.snackbar.displaySuccessMessage('Your email is verified');
                    await this.router.navigateByUrl('/file');
                } else {
                    this.auth.verifyEmail(user).subscribe((res) => {
                            this.snackbar.displaySuccessMessage(res.message);
                        },
                        () => {
                            this.snackbar.displayErrorMessage('Error verifying email');
                        });
                }
            });
        }
    }
}
