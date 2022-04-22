import { Component } from '@angular/core';
import { FileService } from '../file.service';

@Component({
    selector: 'app-drag-drop-upload-file',
    templateUrl: './drag-drop-upload-file.component.html',
    styleUrls: ['./drag-drop-upload-file.component.scss']
})
export class DragDropUploadFileComponent {

    constructor(
        private fileService: FileService
    ) {
    }

    selectFile(event) {
        const files = event.addedFiles;

        // Upload each file selected
        files.forEach((file) => {
            this.fileService.uploadFileStorage(file).then((res) => {
                // Display success message
                this.fileService.displaySuccessMessage(res.message);

                // Update file list
                this.fileService.updateFileSubject();
            });
        });
    }
}
