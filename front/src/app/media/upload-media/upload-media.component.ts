import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MediaService } from '../media.service';

@Component({
    selector: 'app-upload-media',
    templateUrl: './upload-media.component.html',
    styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent {

    formMessage = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private mediaService: MediaService,
    ) {
    }

    uploadMessage() {
        const message = this.formMessage.value;
        console.log(message);

        this.mediaService.uploadMediaFirestore(message).then((res) => {
            // Clear input
            this.formMessage.setValue('');

            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    setFile(file: Event) {
        this.mediaService.uploadMediaStorage(file).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    uploadFile() {
        document.getElementById('file_upload')?.click();
    }
}
