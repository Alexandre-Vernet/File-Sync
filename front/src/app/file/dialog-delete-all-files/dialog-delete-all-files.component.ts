import { Component, OnDestroy } from '@angular/core';
import { FileService } from '../file.service';
import { Subject, take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-delete-all-files',
    templateUrl: './dialog-delete-all-files.component.html',
    styleUrls: ['./dialog-delete-all-files.component.scss']
})
export class DialogDeleteAllFilesComponent implements OnDestroy {

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        public dialogRef: MatDialogRef<{ message: string }>
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    deleteAllFiles() {
        this.fileService.deleteAllFiles()
            .pipe(take(1))
            .subscribe({
                error: (error) => this.dialogRef.close(error)
            });

    }
}
