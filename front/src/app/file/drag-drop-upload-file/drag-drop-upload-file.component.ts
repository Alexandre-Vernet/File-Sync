import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
    selector: 'app-drag-drop-upload-file',
    templateUrl: './drag-drop-upload-file.component.html',
    styleUrls: ['./drag-drop-upload-file.component.scss']
})
export class DragDropUploadFileComponent {

    storage = getStorage();


    constructor(
        private fileService: FileService
    ) {
    }

    selectFile(event) {
        const files = event.addedFiles;

        // Upload each file selected
        files.forEach((file) => {
            // Get more info like name, type
            const name = file.name;
            const url = null;
            const type = file.type;
            const date = new Date();

            const newFile = new File(
                name,
                url,
                type,
                date
            );

            // Set file target in firebase storage
            const fileSource = `files/${ file.name }`;
            const storageRef = ref(this.storage, fileSource);

            // Upload file to firebase storage
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(ref(this.storage, fileSource))
                    .then(async (url) => {
                        // Get url
                        newFile.url = url;

                        // Store file in firestore
                        this.fileService.uploadFileStorage(newFile).subscribe((res) => {
                            // Display success message
                            this.fileService.displaySuccessMessage(res.message);

                            // Update file list
                            this.fileService.updateFileSubject();
                        });
                    });
            });

        });
    }
}
