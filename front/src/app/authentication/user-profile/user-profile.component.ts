import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { UserWithId } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { DialogDeleteAllFilesComponent } from '../../file/dialog-delete-all-files/dialog-delete-all-files.component';
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: UserWithId;

    formUpdateProfile = new FormGroup({
        displayName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    formUpdatePassword = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    });

    constructor(
        private auth: AuthenticationService,
        public dialog: MatDialog,
        private snackbar: SnackbarService,
    ) {
    }

    ngOnInit() {
        this.user = this.auth.getUser();

        // Update form
        this.formUpdateProfile.setValue({
            displayName: this.user.displayName,
            email: this.user.email,
        });
    }

    updateProfile() {
        const formValue = this.formUpdateProfile.value;
        const user: UserWithId = {
            uid: this.user.uid,
            displayName: formValue.displayName,
            email: formValue.email,
            photoURL: this.user.photoURL,
        };

        this.auth.updateUser(user).subscribe(() => {
            this.snackbar.displaySuccessMessage('Profile updated');
        });
    }

    async updatePassword() {
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
            this.auth.updatePassword(password, newPassword).then(() => {
                // Update form
                this.formUpdatePassword.reset();

                // Show success message
                this.snackbar.displaySuccessMessage('Your password has been updated');
            }).catch(() => {
                this.formUpdatePassword.controls.password.setErrors({
                    'auth': 'Wrong password'
                });
            });
        }
    }

    deleteAccount() {
        // Open dialog to confirm account deletion
        this.dialog.open(DialogDeleteAccountComponent);
    }

    deleteAllFiles() {
        // Open dialog to confirm file deletion
        this.dialog.open(DialogDeleteAllFilesComponent);
    }
}
