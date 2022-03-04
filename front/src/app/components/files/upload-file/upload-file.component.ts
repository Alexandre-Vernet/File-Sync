import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../services/authentication/file/file.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

    formUploadFile = new FormGroup({
        file: new FormControl('', [Validators.required])
    });

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
    }

    async uploadFile() {
        const file = this.formUploadFile.get('file').value;

        this.fileService.uploadFile(file).then((file) => {
            console.log(file);
        }).catch((error) => {
            console.error(error);
        });
    }
}
