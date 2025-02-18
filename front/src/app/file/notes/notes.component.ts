import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getStorage } from 'firebase/storage';
import { FileService } from '../file.service';
import { File } from '../file';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../utils.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatSnackBarModule
    ],

})
export class NotesComponent implements OnInit, OnDestroy {

    isResponsive: boolean;
    formFile = new FormControl('', [Validators.required]);

    storage = getStorage();

    unsubscribe$ = new Subject<void>();

    constructor(
        private fileService: FileService,
        private readonly utilsService: UtilsService,
        private readonly snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.isResponsive = window.innerWidth < 768;
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    uploadNote() {
        const file: File = {
            name: this.formFile.value,
            type: this.utilsService.detectTextMarkdown(this.formFile.value) ? 'text/markdown' : 'text/plain',
            size: 0,
            date: new Date()
        };

        this.uploadFile(file);
    }

    pastFromClipboard(e) {
        // Get file from clipboard
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const fileToUploadFirestore = items[index];
            const { type } = fileToUploadFirestore;

            if (fileToUploadFirestore.kind === 'file') {
                this.fileService.files$
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(files => {
                        const name = `img - ${ files.length + 1 }.png`;
                        const file: File = {
                            name,
                            type: this.utilsService.determineFileType(name, type),
                            size: 0,    /* Clipboard doesn't access to file size */
                            date: new Date()
                        };
                        this.uploadFile(file, fileToUploadFirestore);
                    });
            }
        }
    }

    private uploadFile(file: File, fileToUploadFirestore?) {
        this.fileService.uploadFileFirestore(file, fileToUploadFirestore?.getAsFile())
            .subscribe({
                next: () => {
                    this.formFile.reset();
                    this.displaySuccessMessage('File has been successfully created');
                },
                error: (error) => {
                    if (error.error.code === 'FILE_ALREADY_EXISTS') {
                        this.formFile.setErrors({ fileAlreadyExists: error.error.message });
                    } else {
                        this.formFile.setErrors({ UNKNOWN_ERROR: error?.error?.message ? error.error.message : 'An error has occurred' });
                    }
                },
            });
    }

    private displaySuccessMessage(message: string, duration?: number) {
        if (message.trim()) {
            this.snackBar.open(message, 'OK', {
                duration: duration || 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['success-snackbar']
            });
        }
    }

    @HostListener('document:keydown.control.enter', ['$event'])
    onKeydownHandler() {
        this.uploadNote();
    }
}
