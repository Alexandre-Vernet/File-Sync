import { Component, OnInit } from '@angular/core';
import { UserWithId } from '../../authentication/user';
import { FileService } from '../file.service';
import { MatDialog } from '@angular/material/dialog';
import { File, FileWithId } from '../file';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { DialogUpdateFileComponent } from '../file-card/file-card.component';

@Component({
    selector: 'app-tabs-files',
    templateUrl: './tabs-files.component.html',
    styleUrls: ['./tabs-files.component.scss']
})
export class TabsFilesComponent implements OnInit {

    files: FileWithId[] = [];
    user: UserWithId;

    constructor(
        private fileService: FileService,
        public dialog: MatDialog,
        private snackbar: SnackbarService
    ) {
    }

    ngOnInit(): void {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });
    }

    hasFile(type: string): boolean {
        type = this.castTypeFile(type);
        // Find in files if this type exists
        const file = this.files.find((file) => this.castTypeFile(file.type) === type);
        return !!file;
    }

    openDialogUpdateFile(file: FileWithId) {
        this.dialog.open(DialogUpdateFileComponent, { data: file });
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


    deleteFile(file: FileWithId): void {
        this.fileService.deleteFile(file).subscribe((res) => {
            // Display message
            this.snackbar.displaySuccessMessage(res.message);

            // Remove file from list
            this.fileService.updateFileSubject();
        });
    }
}
