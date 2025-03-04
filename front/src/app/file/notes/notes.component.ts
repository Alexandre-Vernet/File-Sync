import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getStorage } from 'firebase/storage';
import { FileService } from '../file.service';
import { File } from '../file';
import { Subject, take } from 'rxjs';
import { UtilsService } from '../utils.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

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
        private readonly snackbarService: SnackbarService,
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

            if (fileToUploadFirestore.kind !== 'file') {
                return;
            }

            this.fileService.files$
                .pipe(take(1))
                .subscribe(files => {
                    const name = `Image (${ files.length + 1 }).png`;
                    const file: File = {
                        name,
                        type,
                        size: 0,    /* Clipboard doesn't access to file size */
                        date: new Date()
                    };
                    this.uploadFile(file, fileToUploadFirestore);
                    return;
                });
        }
    }

    private uploadFile(file: File, fileToUploadFirestore?) {
        this.fileService.uploadFileFirestore(file, fileToUploadFirestore?.getAsFile())
            .subscribe({
                next: () => {
                    this.formFile.reset();
                    this.snackbarService.displaySuccessMessage('File has been successfully created');
                },
                error: (error) => {
                    if (error.error.code === 'FILE_ALREADY_EXISTS') {
                        this.formFile.setErrors({ fileAlreadyExists: error.error.message });
                    } else {
                        this.formFile.setErrors({ UNKNOWN_ERROR: error?.error?.message ?? 'An error has occurred' });
                    }
                },
            });
    }

    @HostListener('document:keydown.control.enter', ['$event'])
    onKeydownHandler() {
        this.uploadNote();
    }
}
