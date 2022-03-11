import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../services/file/file.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

    formUploadFile = new FormGroup({
        message: new FormControl('', [Validators.required])
    });

    constructor(
        private fileService: FileService,
    ) {
    }

    async uploadMessage() {
        const message = this.formUploadFile.get('message').value;

        this.fileService.uploadMessage(message).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    setFile(file: Event) {
        this.fileService.uploadFile(file).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    uploadFile() {
        document.getElementById('file_upload')?.click();
    }
}
