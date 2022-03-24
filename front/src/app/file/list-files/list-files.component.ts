import { Component, Inject, OnInit } from '@angular/core';
import { FileResponse, FileWithId } from '../file';
import { UserWithId } from '../../authentication/user';
import { FileService } from '../file.service';
import * as moment from 'moment';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {
    files: FileWithId[] = [];
    user: UserWithId;
    searchBar: string;

    constructor(
        private fileService: FileService,
        private auth: AuthenticationService,
        public dialog: MatDialog,
    ) {
    }

    async ngOnInit() {

        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });

        setTimeout(() => {

            // Get user
            this.auth.getAuth().then((user) => {
                this.user = user;

                // Get files
                this.fileService.getFiles(user.uid).then((files) => {
                    this.files = files;
                }).catch((error: FileResponse) => {
                    this.fileService.displayErrorMessage(error);
                });
            });
        }, 2000);
    }

    convertTypeFile(type: string): string {
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

    openDialogUpdateFile(file: FileWithId) {
        this.dialog.open(DialogUpdateFileComponent, { data: file });
    }

    deleteFile(file: FileWithId): void {
        this.fileService.deleteFile(file).then(() => {
            this.files = this.files.filter((m) => m.id !== file.id);
        }).catch((error: FileResponse) => {
            this.fileService.displayErrorMessage(error);
        });
    }
}

@Component({
    template: `
        <h1 mat-dialog-title>Update {{ file.name }}</h1>
        <div mat-dialog-content>
            <mat-form-field appearance="fill">
                <mat-label>Update message</mat-label>
                <input (keyup.enter)="updateFile()" matInput placeholder="Hello World" [formControl]="formFile" required>
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
        }).catch((error: FileResponse) => {
            this.fileService.displayErrorMessage(error);
        });
    }

    getErrorMessage() {
        if (this.formFile.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFile.hasError('empty') ? 'You must enter a value' : '';
    }

}
