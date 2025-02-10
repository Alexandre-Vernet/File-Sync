import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-dialog-reset-password',
    templateUrl: './dialog-reset-password.component.html',
    styleUrls: ['./dialog-reset-password.component.scss']
})
export class DialogResetPasswordComponent implements OnDestroy {

    formResetPassword = new FormControl('', [Validators.required, Validators.email]);

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly snackbar: SnackbarService,
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
                next: () => this.snackbar.displaySuccessMessage('An email has been send to reset your password'),
                error: () => this.formResetPassword.setErrors({ UNKNOWN_ERROR: 'An error has occurred' }),
            });
    }

    @HostListener('document:keydown.enter', ['$event'])
    onKeydownHandler() {
        this.resetPassword();
    }
}
