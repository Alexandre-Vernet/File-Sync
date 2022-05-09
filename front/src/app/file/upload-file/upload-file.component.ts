import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { File, FileWithoutUrl } from '../file';
import { getStorage } from 'firebase/storage';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
    formFile = new FormControl('', [Validators.required]);

    storage = getStorage();


    constructor(
        private fileService: FileService,
        private snackbar: SnackbarService
    ) {
    }


    async uploadMessage() {
        const name = this.formFile.value;
        const type = 'text/plain';
        const size = 0;
        const date = new Date();

        const file: FileWithoutUrl = {
            name,
            type,
            size,
            date
        };

        this.fileService.uploadFileFirestore(file).subscribe((res) => {
            // Reset form
            this.formFile.reset();

            // Show success message
            this.snackbar.displaySuccessMessage(res.message);

            // Remove file from list
            this.fileService.updateFileSubject();
        });
    }


    getErrorMessage() {
        if (this.formFile.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFile.hasError('empty') ? 'You must enter a value' : '';
    }

    pastFromClipboard(e) {
        // Get file from clipboard
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const fileToUploadFirestore = items[index];

            // Check if file
            if (fileToUploadFirestore.kind === 'file') {

                // Get length of file to determine the file name
                let length;
                this.fileService.filesSubject.subscribe((data) => {
                    if (data) {
                        length = data.length;
                    } else {
                        length = 0;
                    }
                });

                const newFile: File = {
                    name: `img - ${ length + 1 }`,
                    url: '',
                    type: fileToUploadFirestore.type,
                    size: fileToUploadFirestore.size,
                    date: new Date()
                };

                // Set size limit to 20MB
                const sizeLimit = 20971520;
                if (newFile.size <= sizeLimit) {
                    this.fileService.uploadFileStorage(newFile, fileToUploadFirestore.getAsFile());


                    // Remove file from list
                    this.fileService.updateFileSubject();
                } else {
                    this.snackbar.displayErrorMessage('File is too big');
                }
            }
        }
    }
}
