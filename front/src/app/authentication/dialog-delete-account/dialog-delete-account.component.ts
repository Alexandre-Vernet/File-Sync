import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dialog-delete-account',
    templateUrl: './dialog-delete-account.component.html',
    styleUrls: ['./dialog-delete-account.component.scss'],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    standalone: true
})
export class DialogDeleteAccountComponent implements OnDestroy {

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly router: Router,
        public dialogRef: MatDialogRef<{ message: string }>
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    confirmDelete() {
        this.auth.deleteUser()
            .pipe(take(1))
            .subscribe({
                next: () => this.router.navigateByUrl('/authentication'),
                error: (error) => this.dialogRef.close(error)
            });
    }
}
