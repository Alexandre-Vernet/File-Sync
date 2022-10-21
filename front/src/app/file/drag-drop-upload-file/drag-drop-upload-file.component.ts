import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file';
import { getStorage } from 'firebase/storage';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

@Component({
    selector: 'app-drag-drop-upload-file',
    templateUrl: './drag-drop-upload-file.component.html',
    styleUrls: ['./drag-drop-upload-file.component.scss']
})
export class DragDropUploadFileComponent {

    storage = getStorage();


    constructor(
        private fileService: FileService,
        private snackbar: SnackbarService
    ) {
    }

    selectFile(event) {

        const rejectedFiles = event.rejectedFiles;
        if (rejectedFiles.length > 0) {
            this.snackbar.displayErrorMessage('File type not supported');
            return;
        }

        const files = event.addedFiles;

        // Get each file selected
        files.forEach((fileToUploadFirestore) => {
            // Get more info like name, type
            const { name, type, size } = fileToUploadFirestore;
            const date = new Date();
            const url = null;

            const newFile: File = {
                name,
                url,
                type: type ? type : File.determineFileType(name),
                size,
                date
            };

            newFile.type = this.convertTxtFileType(newFile);


            // Set size limit to 1GB
            const sizeLimit = 1073741824;
            if (newFile.size <= sizeLimit) {
                this.fileService.uploadFileStorage(newFile, fileToUploadFirestore);

                // Update files list
                this.fileService.updateFileSubject();
            } else {
                this.snackbar.displayErrorMessage('File is too big');
            }
        });
    }

    convertTxtFileType(newFile) {
        return newFile.type === 'text/plain' && newFile.name.includes('.txt') ? newFile.type = 'application/txt' : newFile.type;
    }
}
