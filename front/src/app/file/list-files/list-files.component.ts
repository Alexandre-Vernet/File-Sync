import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { File, FileWithId } from '../file';
import { FileService } from '../file.service';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit, AfterViewInit {
    files?: FileWithId[] = [];
    searchBar: string;


    // Pagination
    filesToShow: FileWithId[] = [];
    pageSize = 2;

    constructor(
        private fileService: FileService,
        public dialog: MatDialog,
        private snackbar: SnackbarService,
    ) {
    }

    ngOnInit() {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
            setTimeout(() => {
                this.filesToShow = this.files.slice(0, this.pageSize);
            }, 200);
        });
    }

    clearSearchBar() {
        this.searchBar = '';
        this.filesToShow = this.files.slice(0, this.pageSize);
    }

    ngAfterViewInit() {
    }

    onPageChange($event) {
        this.filesToShow = this.files.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
    }

    castTypeFile(type: string): string {
        return File.castTypeFile(type);
    }

    convertDate(date: Date): string {
        return File.convertDate(date);
    }

    isFileEmailOrPhoneOrLink(type: string): string {
        return File.isFileEmailOrPhoneOrLink(type);
    }

    convertSize(size: number): string {
        return File.convertSize(size);
    }


    orderBy(type: string) {
        // Sort by date
        if (type === 'date') {
            this.filesToShow.sort((a, b) => {
                return moment(a.date).isBefore(b.date) ? 1 : -1;
            });

            // Sort by name
        } else if (type === 'name') {
            this.filesToShow.sort((a, b) => {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });

            // Sort by size ASC
        } else if (type === 'size') {
            this.filesToShow.sort((a, b) => {
                return a.size < b.size ? 1 : -1;
            });

        } else {
            this.filesToShow.sort((a, b) => {
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

    openDialogUpdateFile(file: FileWithId) {
        this.dialog.open(DialogUpdateFileComponent, { data: file });
    }

    deleteFile(file: FileWithId): void {
        this.fileService.deleteFile(file).subscribe((res) => {
            // Display message
            this.snackbar.displaySuccessMessage(res.message);

            // Remove file from list
            this.fileService.updateFileSubject();
        });
    }
}

@Component({
    template: `
        <h1 mat-dialog-title>Update file name</h1>
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
        private snackbar: SnackbarService
    ) {
    }

    updateFile() {
        this.file.name = this.formFile.value;

        this.fileService.updateFile(this.file).subscribe((res) => {
            // Display message
            this.snackbar.displaySuccessMessage(res.message);

            // Reset form
            this.formFile.reset();
        });
    }

    getErrorMessage() {
        if (this.formFile.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFile.hasError('empty') ? 'You must enter a value' : '';
    }
}
