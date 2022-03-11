import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MediaService } from '../../../services/media/media.service';

@Component({
    selector: 'app-upload-media',
    templateUrl: './upload-media.component.html',
    styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent {
    formUploadMessage = new FormGroup({
        message: new FormControl('', [Validators.required])
    });

    constructor(
        private mediaService: MediaService,
    ) {
    }

    uploadMessage() {
        const message = this.formUploadMessage.get('message').value;

        this.mediaService.uploadMessage(message).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    setFile(file: Event) {
        this.mediaService.uploadFile(file).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }

    uploadFile() {
        document.getElementById('file_upload')?.click();
    }
}
