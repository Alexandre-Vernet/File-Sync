import { Component, Inject, Input } from '@angular/core';
import { File, FileWithId } from '../file';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {

    @Input() file: FileWithId;

    constructor(
        private fileService: FileService,
        private snackbar: SnackbarService,
        private dialog: MatDialog,
    ) {
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
        if (size !== 0) {
            return File.convertSize(size);
        } else {
            return '0';
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
                <input (keyup.enter)="updateFile()" matInput placeholder="Hello World" [formControl]="formFileName"
                       required>
                <mat-error *ngIf="formFileName.invalid">{{ getErrorMessage() }}</mat-error>
            </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="primary" (click)="updateFile()" [disabled]="!formFileName.valid"
                    [mat-dialog-close]="true">
                Update
            </button>
        </div>
    `,
})
export class DialogUpdateFileComponent {

    formFileName = new FormControl(this.file.name, [Validators.required]);

    constructor(
        @Inject(MAT_DIALOG_DATA) public file: FileWithId,
        private fileService: FileService,
        private snackbar: SnackbarService
    ) {
    }

    updateFile() {
        this.file.name = this.formFileName.value;

        this.fileService.updateFile(this.file).subscribe((res) => {
            // Display message
            this.snackbar.displaySuccessMessage(res.message);

            // Reset form
            this.formFileName.reset();
        });
    }

    getErrorMessage() {
        if (this.formFileName.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFileName.hasError('empty') ? 'You must enter a value' : '';
    }
}
