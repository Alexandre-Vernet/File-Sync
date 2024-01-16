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
        if (message.trim() !== '') {
            this.snackBar.open(message, 'OK', {
                duration: duration || 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['success-snackbar']
            });
        }
    }

    displayErrorMessage(message: string) {
        if (message.trim() !== '') {
            this.snackBar.open(message, 'OK', {
                duration: 8000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
            });
        }
    }
}
