import { Component, Input } from '@angular/core';
import { FileWithId } from '../file';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { FilePipe } from '../file.pipe';
import { DialogUpdateFileNameComponent } from '../dialog-update-file-name/dialog-update-file-name.component';

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

    getScreenWidth(): number {
        return window.innerWidth;
    }


    castTypeFile(type: string): string {
        return new FilePipe().castTypeFile(type);
    }

    convertDate(date: Date): string {
        return new FilePipe().convertDate(date);
    }

    isFileEmailOrPhoneOrLink(type: string): string {
        return new FilePipe().isFileEmailOrPhoneOrLink(type);
    }

    convertSize(size: number): string {
        return new FilePipe().convertSize(size);
    }

    openDialogUpdateFileName(file: FileWithId) {
        this.dialog.open(DialogUpdateFileNameComponent, { data: file });
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
