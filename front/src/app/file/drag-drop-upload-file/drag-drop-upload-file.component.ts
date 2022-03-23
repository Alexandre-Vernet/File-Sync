import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { FileResponse } from '../file';

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
        this.fileService.uploadFileStorage(event).then((res) => {
            console.log(res);
        }).catch((error: FileResponse) => {
            console.error(error);
            this.fileService.displayErrorMessage(error);
        });
    }
}
