import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { File, FileWithoutUrl } from '../file';
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

    pastFromClipboard(e) {
        // Get file from clipboard
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];

            // Check if file
            if (item.kind === 'file') {

                // Get length of file to determine the file name
                let length;
                this.fileService.filesSubject.subscribe((data) => {
                    if (data) {
                        length = data.length;
                    } else {
                        length = 0;
                    }
                });

                const file: File = {
                    name: `img - ${ length + 1 }`,
                    url: '',
                    type: item.type,
                    date: new Date()
                };

                // Set file target in firebase storage
                const fileSource = `files/img - ${ length + 1 }`;
                const storageRef = ref(this.storage, fileSource);

                // Upload file to firebase storage
                uploadBytes(storageRef, item.getAsFile()).then(() => {
                    getDownloadURL(ref(this.storage, fileSource))
                        .then(async (url) => {
                            // Set URL
                            file.url = url;

                            // Store file in firestore
                            this.fileService.uploadFileStorage(file).subscribe((res) => {
                                // Display success message
                                this.fileService.displaySuccessMessage(res.message);

                                // Update file list
                                this.fileService.updateFileSubject();
                            });
                        });
                });
            }
        }
    }
}
