import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-dialog-delete-account',
    templateUrl: './dialog-delete-account.component.html',
    styleUrls: ['./dialog-delete-account.component.scss']
})
export class DialogDeleteAccountComponent implements OnDestroy {

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly router: Router
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    confirmDelete() {
        combineLatest([
            this.auth.deleteUser(),
            this.auth.signOut()
        ])
            .pipe(takeUntil(this.unsubscribe$)
            ).subscribe(() => this.router.navigateByUrl(''));
    }
}
