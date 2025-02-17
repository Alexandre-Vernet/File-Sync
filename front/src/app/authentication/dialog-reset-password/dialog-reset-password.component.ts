import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog-reset-password',
    templateUrl: './dialog-reset-password.component.html',
    styleUrls: ['./dialog-reset-password.component.scss'],
    imports: [
        MatDialogModule,
        MatInputModule,
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    standalone: true
})
export class DialogResetPasswordComponent implements OnDestroy {

    formResetPassword = new FormControl('', [Validators.required, Validators.email]);

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly snackBar: MatSnackBar,
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    resetPassword() {
        const email = this.formResetPassword.value;
        this.auth.resetPassword(email)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.displaySuccessMessage('An email has been send to reset your password'),
                error: () => this.formResetPassword.setErrors({ UNKNOWN_ERROR: 'An error has occurred' }),
            });
    }

    @HostListener('document:keydown.enter', ['$event'])
    onKeydownHandler() {
        this.resetPassword();
    }

    private displaySuccessMessage(message: string, duration?: number) {
        if (message.trim()) {
            this.snackBar.open(message, 'OK', {
                duration: duration || 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['success-snackbar']
            });
        }
    }
}
