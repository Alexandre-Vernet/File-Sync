import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(
        private snackBar: MatSnackBar
    ) {
    }

    displaySuccessMessage(message: string, duration?: number) {
        this.snackBar.open(message, '', {
            duration: duration || 2000,
            panelClass: ['success-snackbar']
        });
    }

    displayErrorMessage(message: string) {
        this.snackBar.open(message, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    }

    displayWarningMessage(message: string) {
        this.snackBar.open(message, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 4000,
        });
    }
}
