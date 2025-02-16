import { Component, Input, OnDestroy, Output } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { FilePipe } from '../file.pipe';
import { DialogUpdateFileNameComponent } from '../dialog-update-file-name/dialog-update-file-name.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnDestroy {

    protected readonly window = window;

    @Input() file: File;
    @Output() errorMessage = new Subject<string>;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        private readonly snackbar: SnackbarService,
        private readonly dialog: MatDialog,
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    castTypeFile(type: string) {
        return new FilePipe().castTypeFile(type);
    }

    convertDate(date: Date) {
        return new FilePipe().convertDate(date);
    }

    isFileEmailOrPhoneOrLink(type: string) {
        return new FilePipe().isFileEmailOrPhoneOrLink(type);
    }

    convertSize(size: number) {
        return new FilePipe().convertSize(size);
    }

    openDialogUpdateFileName(file: File) {
        this.dialog.open(DialogUpdateFileNameComponent, { data: file });
    }

    deleteFile(file: File) {
        this.fileService.deleteFile(file)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: () => this.snackbar.displaySuccessMessage('File has been successfully deleted'),
                error: (error) => error?.error?.message ? this.errorMessage.next(error.error.message) : this.errorMessage.next('An error has occurred'),
            });
    }
}
