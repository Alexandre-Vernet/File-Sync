import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { File, FileType } from '../file';
import { FileService } from '../file.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { UtilsService } from '../utils.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NuMarkdownPreviewComponent } from '@ng-util/markdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';


export class FileErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss'],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        NuMarkdownPreviewComponent,
        PdfViewerModule,
        MatSnackBarModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    standalone: true
})


export class FileCardComponent implements OnInit, OnDestroy {

    protected readonly FileType = FileType;
    protected readonly window = window;

    @Input() file: File;

    formUpdateNote = new FormControl('', [Validators.required]);

    @ViewChild('fileNameText') fileNameText: ElementRef;
    @ViewChild('fileNameInput') fileNameInput: ElementRef;

    @ViewChild('noteTextarea') noteTextarea!: ElementRef;

    editMode = false;
    originalFileExtension: string;

    textAreaMinRows = 2;
    textAreaMaxRows = 20;
    textAreaHeight: number = this.textAreaMaxRows;

    matcher = new FileErrorStateMatcher();

    renameFileInProgress = false;
    unsubscribe$ = new Subject<void>();


    constructor(
        private readonly fileService: FileService,
        private readonly utilsService: UtilsService,
        private readonly snackbarService: SnackbarService,
    ) {
    }

    ngOnInit() {
        const fileName = this.file.name;
        this.formUpdateNote.setValue(fileName);
        this.setNoteTextareaHeight(fileName);

        // Adapt textarea height dynamically
        this.formUpdateNote.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(value => this.setNoteTextareaHeight(value));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    castTypeFile(type: string) {
        return this.utilsService.castTypeFile(type);
    }

    convertDate(date: Date) {
        return this.utilsService.convertDate(date);
    }

    convertSize(size: number) {
        return this.utilsService.convertSize(size);
    }

    removeExtensionFile(fileName: string): string {
        return fileName.replace(/\.[^/.]+$/, "");
    }

    clickRenameButton() {
        if (this.editMode) {
            this.renameNote();
        } else {
            // Delayed transition to edit mode to ensure the input is ready
            setTimeout(() => this.editMode = true);

            // Remove file extension (everything after the last dot, including the dot itself)
            const fileNameWithoutExtension = this.removeExtensionFile(this.formUpdateNote.value);
            this.formUpdateNote.setValue(fileNameWithoutExtension);

            this.originalFileExtension = this.file.name.split('.').pop();

            // Focus the input after the transition to edit mode
            setTimeout(() => this.focusInput());
        }
    }

    renameNote() {
        const file: File = {
            ...this.file,
            name: this.file.url ? `${ this.formUpdateNote.value }.${ this.originalFileExtension }` : this.formUpdateNote.value,
        }

        this.renameFileInProgress = true;

        if (file.name !== this.file.name) {
            this.fileService.updateFile(file)
                .pipe(take(1))
                .subscribe({
                    next: (res) => {
                        this.snackbarService.displaySuccessMessage(res.message);
                        this.editMode = false;
                        this.renameFileInProgress = false;
                    },
                    error: (error) => {
                        if (error?.error?.code === 'NAME_ALREADY_EXISTS') {
                            this.formUpdateNote.setErrors({ nameAlreadyExist: error?.error?.message });
                        } else {
                            this.formUpdateNote.setErrors({ unknownError: error?.error?.message ?? 'An error has occurred' });
                        }
                        this.renameFileInProgress = false;
                    },
                });
        }
    }

    deleteFile(file: File) {
        this.fileService.deleteFile(file)
            .pipe(take(1))
            .subscribe({
                next: () => this.snackbarService.displaySuccessMessage('File has been successfully deleted'),
                error: (error) => this.formUpdateNote.setErrors({ unknownError: error?.error?.message ?? 'An error has occurred' })
            });
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const clickedInsideInput = this.fileNameInput?.nativeElement.contains(event.target);
        const clickedInsideText = this.fileNameText?.nativeElement.contains(event.target);

        if (!this.renameFileInProgress && !clickedInsideInput && !clickedInsideText && this.editMode) {
            this.formUpdateNote.setValue(this.file.name);
            this.editMode = false;
        }
    }

    @HostListener('document:keydown.enter', ['$event'])
    onKeydownEnterHandler() {
        if (this.editMode) {
            this.renameNote();
        }
    }

    @HostListener('document:keydown.control.enter', ['$event'])
    onKeydownCtrlEnterHandler() {
        if (this.noteTextarea) {
            const updatedText = this.noteTextarea.nativeElement.value;
            if (updatedText !== this.file.name) {
                this.formUpdateNote.setValue(updatedText);
                this.renameNote();
            }
        }

        if (this.editMode) {
            this.renameNote();
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownEscapeHandler() {
        this.editMode = false;
    }

    private focusInput() {
        if (this.fileNameInput) {
            this.fileNameInput.nativeElement.focus();
        }
    }

    private setNoteTextareaHeight(value: string) {
        this.textAreaHeight = Math.min(this.textAreaMaxRows, Math.max(this.textAreaMinRows, (value || '').split('\n').length));
    }
}
