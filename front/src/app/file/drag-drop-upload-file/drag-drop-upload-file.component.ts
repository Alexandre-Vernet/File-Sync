import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file';
import { getStorage } from 'firebase/storage';

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

        // Get each file selected
        files.forEach((fileToUploadFirestore) => {
            // Get more info like name, type
            const name = fileToUploadFirestore.name;
            const url = null;
            const type = fileToUploadFirestore.type;
            const date = new Date();

            const newFile: File = {
                name,
                url,
                type,
                date
            };

            // Upload file to firebase
            this.fileService.uploadFileStorage(newFile, fileToUploadFirestore);
        });
    }
}
