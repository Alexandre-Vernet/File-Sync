import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { DialogDeleteAllFilesComponent } from '../../file/dialog-delete-all-files/dialog-delete-all-files.component';
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component';
import { delay, Subject, takeUntil } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
    user: User;

    formUpdateProfile = new FormGroup({
        displayName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    formUpdatePassword = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    });

    errorMessage: string;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        public readonly dialog: MatDialog,
        private readonly snackbar: SnackbarService,
    ) {
    }

    ngOnInit() {
        this.auth.user$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(user => {
                this.formUpdateProfile.setValue({
                    displayName: user.displayName,
                    email: user.email,
                });
                this.user = user;
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    updateProfile() {
        const formValue = this.formUpdateProfile.value;
        const user: User = {
            uid: this.user.uid,
            displayName: formValue.displayName,
            email: formValue.email,
            photoURL: this.user.photoURL,
        };

        this.auth.updateUser(user)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.snackbar.displaySuccessMessage('Profile updated'),
                error: (error) => this.formUpdateProfile.setErrors({ UNKNOWN_ERROR: error?.error?.message ? error.error.message : 'An error has occurred' }),
            });
    }

    updatePassword() {
        const { password, newPassword, confirmNewPassword } = this.formUpdatePassword.value;

        // Check if new password and confirm new password are the same
        if (newPassword !== confirmNewPassword) {
            this.formUpdatePassword.controls.newPassword.setErrors({
                'match': 'Passwords don\'t match'
            });
            this.formUpdatePassword.controls.confirmNewPassword.setErrors({
                'match': 'Passwords don\'t match'
            });
            return;
        }

        // Check if new password is valid
        if (password === newPassword && password === confirmNewPassword) {
            this.formUpdatePassword.controls.newPassword.setErrors({
                'match': 'New password is the same as old password'
            });
            return;

        } else {
            this.auth.updatePassword(newPassword)
                .subscribe({
                    next: () => {
                        this.formUpdatePassword.reset();
                        this.snackbar.displaySuccessMessage('Your password has been updated');
                    },
                    error: () =>
                        this.formUpdatePassword.controls.password.setErrors({
                            'auth': 'Wrong password'
                        }),
                });
        }
    }

    showConfirmationDialog(dialog: 'deleteAllFiles' | 'deleteAccount') {
        if (dialog === 'deleteAllFiles') {
            this.openDeleteDialog(DialogDeleteAllFilesComponent, 'All files have been successfully deleted');
        } else if (dialog === 'deleteAccount') {
            this.openDeleteDialog(DialogDeleteAccountComponent, 'Account has been successfully deleted');
        }
    }

    openDeleteDialog(className: ComponentType<any>, successMessage: string) {
        const dialogRef = this.dialog.open(className);
        dialogRef.afterClosed()
            .pipe(
                takeUntil(this.unsubscribe$),
                delay(0)
            )
            .subscribe({
                next: (result) => {
                    if (!!result && !result?.error) {
                        this.snackbar.displaySuccessMessage(successMessage);
                        return;
                    }

                    if (result?.error?.message) {
                        this.errorMessage = result.error.message;
                    } else {
                        this.errorMessage = 'An error has occurred';
                    }
                    this.snackbar.displayErrorMessage('An error has occurred');
                },
            });
    }
}
