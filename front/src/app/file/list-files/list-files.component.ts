import { Component, Inject, OnInit } from '@angular/core';
import { FileWithId } from '../file';
import { FileService } from '../file.service';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {
    files?: FileWithId[] = [];
    searchBar: string;

    constructor(
        private fileService: FileService,
        public dialog: MatDialog,
    ) {
    }

    async ngOnInit() {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });
    }

    castTypeFile(type: string): string {
        // Get the type of file before the slash
        return type.split('/')[0];
    }

    convertDate(date: Date): string {
        return moment(date).startOf('minutes').fromNow();
    }


    orderBy(type: string) {
        if (type === 'date') {
            this.files.sort((a, b) => {
                return moment(a.date).isBefore(b.date) ? 1 : -1;
            });
        } else if (type === 'name') {
            this.files.sort((a, b) => {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });
        } else {
            this.files.sort((a, b) => {
                if (a[type] < b[type]) {
                    return -1;
                }
                if (a[type] > b[type]) {
                    return 1;
                }
                return 0;
            });
        }
    }

    clearSearchBar() {
        this.searchBar = '';
    }

    openDialogUpdateFile(file: FileWithId) {
        this.dialog.open(DialogUpdateFileComponent, { data: file });
    }

    deleteFile(file: FileWithId): void {
        this.fileService.deleteFile(file).then(() => {
            this.files = this.files.filter((m) => m.id !== file.id);
        }).catch((error: HttpErrorResponse) => {
            this.fileService.displayErrorMessage(error.error);
        });
    }
}

@Component({
    template: `
        <h1 mat-dialog-title>Update {{ file.name }}</h1>
        <div mat-dialog-content>
            <mat-form-field appearance="fill">
                <mat-label>Update message</mat-label>
                <input (keyup.enter)="updateFile()" matInput placeholder="Hello World" [formControl]="formFile"
                       required>
                <mat-error *ngIf="formFile.invalid">{{ getErrorMessage() }}</mat-error>
            </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="primary" (click)="updateFile()" [disabled]="!formFile.valid"
                    [mat-dialog-close]="true">
                Update
            </button>
        </div>
    `,
})
export class DialogUpdateFileComponent {

    formFile = new FormControl(this.file.name, [Validators.required]);

    constructor(
        @Inject(MAT_DIALOG_DATA) public file: FileWithId,
        private fileService: FileService,
    ) {
    }

    updateFile() {
        this.file.name = this.formFile.value;
        const fileId = this.file.id;

        this.fileService.updateFile(this.file, fileId).then(() => {
            // Reset form
            this.formFile.reset();
        }).catch((error: HttpErrorResponse) => {
            this.fileService.displayErrorMessage(error.error);
        });
    }

    getErrorMessage() {
        if (this.formFile.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFile.hasError('empty') ? 'You must enter a value' : '';
    }

}
