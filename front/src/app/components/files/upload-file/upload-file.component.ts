import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../services/file/file.service';
import { UserWithId } from '../../../classes/user';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
    user: UserWithId;

    formUploadFile = new FormGroup({
        message: new FormControl('', [Validators.required])
    });

    constructor(
        private fileService: FileService,
        private authService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.authService.getAuth().then((user) => {
            this.user = user;
        });

    }

    async uploadMessage() {
        const message = this.formUploadFile.get('message').value;

        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';

        this.fileService.uploadMessage(message, uid).then((file) => {
            console.log(file);
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
