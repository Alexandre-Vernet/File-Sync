import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-dialog-reset-password',
    templateUrl: './dialog-reset-password.component.html',
    styleUrls: ['./dialog-reset-password.component.scss']
})
export class DialogResetPasswordComponent {

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
