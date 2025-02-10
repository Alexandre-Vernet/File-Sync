import { Component, OnDestroy } from '@angular/core';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-dialog-delete-all-files',
    templateUrl: './dialog-delete-all-files.component.html',
    styleUrls: ['./dialog-delete-all-files.component.scss']
})
export class DialogDeleteAllFilesComponent implements OnDestroy {

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        private readonly snackbar: SnackbarService,
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    deleteAllFiles() {
        this.fileService.deleteAllFiles()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.snackbar.displaySuccessMessage('All files have been successfully deleted'));
    }
}
