import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogResetPasswordComponent } from '../dialog-reset-password/dialog-reset-password.component';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        CommonModule,
        MatButtonModule,
        RouterLink,
        MatDialogModule
    ],
    standalone: true
})
export class SignInComponent implements OnInit, OnDestroy {

    formSignIn = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly router: Router,
        private readonly dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.auth.signInWithAccessToken(accessToken)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe({
                    next: () => this.router.navigateByUrl('/')
                });
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    signIn() {
        const formValue = this.formSignIn.value;
        const { email, password } = formValue;

        this.auth.signInWithEmail(email, password)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (error) => {
                    const errorMsg = this.auth.getCustomErrorMessage(error.code);
                    this.formSignIn.controls.email.setErrors({
                        'auth': errorMsg || error?.error?.message || 'An error has occurred'
                    });

                    this.focusOnEmailInput();
                }
            });
    }

    signInWithPopUp(provider: 'google' | 'github') {
        this.auth.signInWithPopup(provider)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (error) => {
                    const errorMsg = this.auth.getCustomErrorMessage(error.code);
                    this.formSignIn.controls.email.setErrors({
                        'auth': errorMsg || error?.error?.message || 'An error has occurred'
                    });

                    this.focusOnEmailInput();
                }
            });
    }

    focusOnEmailInput() {
        this.formSignIn.controls.email.markAsTouched();
    }

    resetPassword() {
        this.dialog.open(DialogResetPasswordComponent);
    }
}

