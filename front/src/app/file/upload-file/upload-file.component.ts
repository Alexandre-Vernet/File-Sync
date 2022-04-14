import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileWithoutUrl } from '../file';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
    formFile = new FormControl('', [Validators.required]);

    constructor(
        private fileService: FileService,
    ) {
    }

    async uploadMessage() {
        const message = this.formFile.value;

        this.fileService.uploadFileFirestore(message).then((res) => {
            // Reset form
            this.formFile.reset();

            // Show success message
            this.fileService.displaySuccess(res.message);
        }).catch((error: HttpErrorResponse) => {
            this.fileService.displayErrorMessage(error.error);
        });
    }


    getErrorMessage() {
        if (this.formFile.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFile.hasError('empty') ? 'You must enter a value' : '';
    }

    async selectFile(event) {
        const files = event.addedFiles;

        // Upload each file selected
        files.forEach((file) => {
            this.fileService.uploadFileStorage(file).then((res) => {
                // Display success message
                this.fileService.displaySuccess(res.message);
            }).catch((error: HttpErrorResponse) => {
                this.fileService.displayErrorMessage(error);
            });
        });
    }

    async pastFromClipboard(clipboardEvent: ClipboardEvent) {
        // Get files from clipboard
        const dataTransfer = clipboardEvent.clipboardData;
        const file = dataTransfer.files[0];

        const t = Object.assign(file);
        const fileName = t.name;

        // Get file id with length of files
        const fileId = await this.fileService.getFilesLength() + 1;

        const formattedFile: FileWithoutUrl = {
            name: `${ fileName } - ${ fileId }`,
            type: t.type,
            date: new Date()
        };

        if (file) {
            this.fileService.uploadFileStorage(formattedFile).then((res) => {
                // Display success message
                this.fileService.displaySuccess(res.message);
            }).catch((error: HttpErrorResponse) => {
                this.fileService.displayErrorMessage(error);
            });
        }
    }
}
