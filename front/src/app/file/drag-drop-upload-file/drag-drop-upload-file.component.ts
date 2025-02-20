import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file';
import { getStorage } from 'firebase/storage';
import { FormControl } from '@angular/forms';
import { UtilsService } from '../utils.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

@Component({
    selector: 'app-drag-drop-upload-file',
    templateUrl: './drag-drop-upload-file.component.html',
    styleUrls: ['./drag-drop-upload-file.component.scss'],
    imports: [
        NgxDropzoneModule,
        MatInputModule,
        CommonModule,
        MatSnackBarModule
    ],
    standalone: true
})
export class DragDropUploadFileComponent {

    storage = getStorage();

    formDragDrop = new FormControl(null);

    constructor(
        private readonly fileService: FileService,
        private readonly utilsService: UtilsService,
        private readonly snackbarService: SnackbarService,
    ) {
    }

    selectFile(event) {
        const rejectedFiles = event.rejectedFiles;
        if (rejectedFiles.length > 0) {
            this.formDragDrop.setErrors({ fileTypeNotSupported: 'File type not supported' });
            return;
        }

        const files = event.addedFiles;

        // Get each file selected
        files.forEach((fileToUploadFirestore) => {
            // Get more info like name, type
            const { name, type, size } = fileToUploadFirestore;

            const newFile: File = {
                name,
                type: this.utilsService.determineFileType(name, type),
                size,
                date: new Date()
            };

            // Can't upload executable file
            if (newFile.type === 'application/vnd.android.package-archive' || newFile.type === 'application/x-msdownload') {
                this.formDragDrop.setErrors({ fileTypeNotSupported: 'File type not supported' });
                return;
            }

            // Set size limit to 1GB
            const sizeLimit = 1073741824;
            if (newFile.size >= sizeLimit) {
                this.formDragDrop.setErrors({ fileTooBig: 'File is too big' });
                return;
            }

            this.fileService.uploadFileFirestore(newFile, fileToUploadFirestore)
                .subscribe({
                    next: () => {
                        this.formDragDrop.reset();
                        this.snackbarService.displaySuccessMessage('File has been successfully created');
                    },
                    error: (error) => {
                        if (error?.error?.code === 'FILE_ALREADY_EXISTS') {
                            this.formDragDrop.setErrors({ fileAlreadyExists: error.error.message });
                        } else {
                            this.formDragDrop.setErrors({ UNKNOWN_ERROR: error?.error?.message ? error.error.message : 'An error occurred' });
                        }
                    },
                });
        });
    }
}
