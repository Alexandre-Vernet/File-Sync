import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { FileResponse } from '../file';

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

    uploadMessage() {
        const message = this.formFile.value;

        this.fileService.uploadFileFirestore(message).then(() => {
            // Reset form
            this.formFile.reset();
        }).catch((error: FileResponse) => {
            this.fileService.displayErrorMessage(error);
        });
    }


    getErrorMessage() {
        if (this.formFile.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFile.hasError('empty') ? 'You must enter a value' : '';
    }
}
