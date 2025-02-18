import { Component, ElementRef, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateFileNameComponent } from '../dialog-update-file-name/dialog-update-file-name.component';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../utils.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NuMarkdownPreviewComponent } from '@ng-util/markdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

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
        MatButtonModule
    ],
    standalone: true
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
        private readonly snackBar: MatSnackBar,
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
                next: () => this.displaySuccessMessage('Note has been successfully updated'),
                error: (error) => error?.error?.message ? this.errorMessage.next(error.error.message) : this.errorMessage.next('An error has occurred'),
            });
    }

    deleteFile(file: File) {
        this.fileService.deleteFile(file)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.displaySuccessMessage('File has been successfully deleted'),
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
}
