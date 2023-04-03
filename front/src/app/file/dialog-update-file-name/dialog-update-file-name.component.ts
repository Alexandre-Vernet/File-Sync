import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileWithId } from '../file';
import { FilePipe } from '../file.pipe';

@Component({
    selector: 'app-dialog-update-file-name',
    templateUrl: './dialog-update-file-name.component.html',
    styleUrls: ['./dialog-update-file-name.component.scss']
})
export class DialogUpdateFileNameComponent {
    formFileName = new FormControl(this.file.name, [Validators.required]);

    constructor(
        @Inject(MAT_DIALOG_DATA) public file: FileWithId,
        private fileService: FileService,
        private snackbar: SnackbarService
    ) {
    }

    updateFile() {
        this.file.name = this.formFileName.value;
        if (!this.file.url) {
            this.file.type = new FilePipe().detectTextMarkdown(this.file.name) ? 'text/markdown' : 'text/plain';
        }

        this.fileService.updateFile(this.file)
            .subscribe((res) => {
                // Display message
                this.snackbar.displaySuccessMessage(res.message);

                // Reset form
                this.formFileName.reset();
            });
    }

    getErrorMessage(): string {
        if (this.formFileName.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formFileName.hasError('empty') ? 'You must enter a value' : '';
    }

    submitWithEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter' && event.ctrlKey && this.formFileName.valid) {
            this.updateFile();
        }
    }
}
