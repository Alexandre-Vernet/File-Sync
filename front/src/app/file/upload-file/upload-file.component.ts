import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';

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

        this.fileService.uploadFileFirestore(message).subscribe((res) => {
            // Reset form
            this.formFile.reset();

            // Show success message
            this.fileService.displaySuccessMessage(res.message);

            // Update file list
            this.fileService.updateFileSubject();
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
                this.fileService.displaySuccessMessage(res.message);

                // Update file list
                this.fileService.updateFileSubject();
            });
        });
    }
}
