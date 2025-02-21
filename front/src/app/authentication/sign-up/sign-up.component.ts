import { Component, OnDestroy } from '@angular/core';
import { User } from 'src/app/authentication/user';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        CommonModule,
        MatButtonModule,
        RouterLink
    ],
    standalone: true
})
export class SignUpComponent implements OnDestroy {

    formSignUp = new FormGroup({
        displayName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    });

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly router: Router,
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    signUp() {
        const formValue = this.formSignUp.value;
        const { displayName, email, password } = formValue;

        const user: User = {
            displayName,
            email,
            password,
        };

        this.auth.signUp(user)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (error) => {
                    const errorMsg = this.auth.getCustomErrorMessage(error.code);
                    this.formSignUp.controls.email.setErrors({
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
                    this.formSignUp.controls.email.setErrors({
                        'auth': errorMsg || error?.error?.message || 'An error has occurred'
                    });

                    this.focusOnEmailInput();
                }
            });
    }

    focusOnEmailInput() {
        this.formSignUp.controls.email.markAsTouched();
    }
}
