import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../authentication/user';
import { Router } from '@angular/router';
import { FileService } from '../../file/file.service';
import { FilePipe } from '../../file/file.pipe';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    user: User;
    totalFilesSize: string;
    progressBarValue: number = 0;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly auth: AuthenticationService,
        private readonly router: Router,
        private readonly fileService: FileService
    ) {
    }

    ngOnInit() {
        this.auth.user$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(user => this.user = user);

        this.fileService.files$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((files) => {
                if (files) {
                    const totalSize = new FilePipe().getTotalSize(files);

                    // Convert files size in percentage (5GB = 100%)
                    this.progressBarValue = Math.round(totalSize / 5000000000 * 100);

                    // Display total files size
                    this.totalFilesSize = new FilePipe().convertSize(totalSize);
                }
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    signOut() {
        this.auth.signOut()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.router.navigateByUrl('/authentication'));
    }
}
