import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { FileWithoutUrl } from '../file';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
    formFile = new FormControl('', [Validators.required]);

    storage = getStorage();


    constructor(
        private fileService: FileService,
    ) {
    }

    async uploadMessage() {
        const name = this.formFile.value;
        const type = 'text/plain';
        const date = new Date();

        const file: FileWithoutUrl = {
            name,
            type,
            date
        };

        this.fileService.uploadFileFirestore(file).subscribe((res) => {
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

    async pastFromClipboard(e: any) {
        // Get files from clipboard
        const dataTransfer = e.clipboardData;
        const file = dataTransfer.files[0];

        const { name, type } = file;
        const date = new Date();

        const fileWithoutUrl: FileWithoutUrl = {
            name,
            type,
            date
        };

        console.log(fileWithoutUrl);

        // Set file target in firebase storage
        // const fileSource = `files/${ newFile.name }`;
        // const storageRef = ref(this.storage, fileSource);
        //
        // // Upload file to firebase storage
        // uploadBytes(storageRef, newFile).then(() => {
        //     getDownloadURL(ref(this.storage, fileSource))
        //         .then(async (url) => {
        //             // Get url
        //             newFile.url = url;
        //
        //             // Store file in firestore
        //             this.fileService.uploadFileStorage(newFile).subscribe((res) => {
        //                 // Display success message
        //                 this.fileService.displaySuccessMessage(res.message);
        //
        //                 // Update file list
        //                 this.fileService.updateFileSubject();
        //             });
        //         });
        // });
    }
}
