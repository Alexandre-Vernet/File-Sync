import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';

@Component({
    selector: 'app-dialog-delete-all-files',
    templateUrl: './dialog-delete-all-files.component.html',
    styleUrls: ['./dialog-delete-all-files.component.scss']
})
export class DialogDeleteAllFilesComponent {
    constructor(
        private fileService: FileService,
        private snackbar: SnackbarService,
    ) {
    }

    deleteAllFiles() {
        this.fileService.deleteAllFiles().subscribe((res) => {
            // Display message
            this.snackbar.displaySuccessMessage(res.message);
        });
    }
}
