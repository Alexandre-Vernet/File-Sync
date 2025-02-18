import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { File } from '../file';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
    selector: 'app-dialog-update-file-name',
    templateUrl: './dialog-update-file-name.component.html',
    styleUrls: ['./dialog-update-file-name.component.scss']
})
export class DialogUpdateFileNameComponent implements OnDestroy {

    formFileName = new FormControl(this.file.name, [Validators.required]);

    unsubscribe$ = new Subject<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public file: File,
        private readonly fileService: FileService,
        private readonly utilsService: UtilsService,
        public dialogRef: MatDialogRef<{ message: string }>
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    updateFile() {
        this.file.name = this.formFileName.value;
        if (!this.file.url) {
            this.file.type = this.utilsService.detectTextMarkdown(this.file.name) ? 'text/markdown' : 'text/plain';
        }

        this.fileService.updateFile(this.file)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => {
                    this.formFileName.reset();
                    this.dialogRef.close();
                },
                error: (error) => {
                    if (error.error.code === 'NAME_ALREADY_EXISTS') {
                        this.formFileName.setErrors({ NAME_ALREADY_EXISTS: error.error.message })
                    } else {
                        this.formFileName.setErrors({ UNKNOWN_ERROR: 'An error has occurred' })
                    }
                }
            });
    }

    @HostListener('document:keydown.control.enter', ['$event'])
    onKeydownHandler() {
        if (this.formFileName.valid) {
            this.updateFile();
        }
    }
}
