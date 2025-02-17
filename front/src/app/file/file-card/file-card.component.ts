import { Component, ElementRef, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateFileNameComponent } from '../dialog-update-file-name/dialog-update-file-name.component';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnDestroy {

    protected readonly window = window;

    @Input() file: File;
    @Output() errorMessage = new Subject<string>;

    @ViewChild('noteTextarea') noteTextarea!: ElementRef;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        private readonly utilsService: UtilsService,
        private readonly snackbar: SnackbarService,
        private readonly dialog: MatDialog,
    ) {
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

    openDialogUpdateFileName(file: File) {
        this.dialog.open(DialogUpdateFileNameComponent, { data: file });
    }

    renameNote(file: File) {
        if (!file.name) {
            return;
        }
        this.fileService.updateFile(file)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.snackbar.displaySuccessMessage('Note has been successfully updated'),
                error: (error) => error?.error?.message ? this.errorMessage.next(error.error.message) : this.errorMessage.next('An error has occurred'),
            });
    }

    deleteFile(file: File) {
        this.fileService.deleteFile(file)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.snackbar.displaySuccessMessage('File has been successfully deleted'),
                error: (error) => error?.error?.message ? this.errorMessage.next(error.error.message) : this.errorMessage.next('An error has occurred'),
            });
    }

    @HostListener('document:keydown.control.enter', ['$event'])
    onKeydownHandler() {
        if (this.noteTextarea) {
            const updatedText = this.noteTextarea.nativeElement.value;
            this.renameNote({
                ...this.file,
                name: updatedText,
            });
        }
    }
}
