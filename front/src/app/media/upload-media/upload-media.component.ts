import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MediaService } from '../media.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserWithId } from '../../authentication/user';

@Component({
    selector: 'app-upload-media',
    templateUrl: './upload-media.component.html',
    styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent implements OnInit {

    user: UserWithId;
    formMessage = new FormControl('', [Validators.required]);

    constructor(
        private mediaService: MediaService,
        private auth: AuthenticationService
    ) {
    }

    ngOnInit() {
        // Get user
        this.auth.getAuth().then((user) => {
            this.user = user;
        });
    }

    uploadMessage() {
        const message = this.formMessage.value;

        this.mediaService.uploadMediaFirestore(message).then((res) => {
            // Reset form
            this.formMessage.setValue('');
            this.formMessage.setErrors(null);

            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    uploadFile(file: Event) {
        this.mediaService.uploadMediaStorage(file).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    setFile() {
        document.getElementById('file_upload')?.click();
    }

    getErrorMessage() {
        if (this.formMessage.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formMessage.hasError('empty') ? 'You must enter a value' : '';
    }
}
