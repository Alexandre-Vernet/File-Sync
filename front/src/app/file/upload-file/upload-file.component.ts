import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserWithId } from '../../authentication/user';
import { FileResponse } from '../file';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

    user: UserWithId;
    formFile = new FormControl('', [Validators.required]);

    constructor(
        private fileService: FileService,
        private auth: AuthenticationService,
    ) {
    }

    ngOnInit() {
        // Get user
        this.auth.getAuth().then((user) => {
            this.user = user;
        });
    }

    uploadMessage() {
        const message = this.formFile.value;

        this.fileService.uploadFileFirestore(message).then((res) => {
            // Reset form
            this.formFile.reset();

            console.log(res);
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
