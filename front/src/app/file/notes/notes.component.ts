import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getStorage } from 'firebase/storage';
import { FileService } from '../file.service';
import { SnackbarService } from '../../public/snackbar/snackbar.service';
import { File, FileWithoutUrl } from '../file';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

    formFile = new FormControl('', [Validators.required]);

    storage = getStorage();

    constructor(
        private fileService: FileService,
        private snackbar: SnackbarService
    ) {
    }

    uploadNote() {
        const name = this.formFile.value;
        const type = File.detectTextMarkdown(name) ? 'text/markdown' : 'text/plain';
        const size = 0;
        const date = new Date();

        const file: FileWithoutUrl = {
            name,
            type,
            size,
            date
        };

        this.fileService.uploadFileFirestore(file).subscribe((res) => {
            // Reset form
            this.formFile.reset();

            // Show success message
            this.snackbar.displaySuccessMessage(res.message);

            // Update files list
            this.fileService.updateFileSubject();
        });
    }

    keydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && event.ctrlKey && this.formFile.valid) {
            this.uploadNote();
        }
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
            const fileToUploadFirestore = items[index];

            // Check if file
            if (fileToUploadFirestore.kind === 'file') {

                // Get length of file to determine the file name
                let length;
                this.fileService.filesSubject.subscribe((data) => {
                    if (data) {
                        length = data.length;
                    } else {
                        length = 0;
                    }
                });

                const newFile: File = {
                    name: `img - ${ length + 1 }.png`,
                    url: '',
                    type: fileToUploadFirestore.type,
                    size: 0,    /* Clipboard doesn't access to file size */
                    date: new Date()
                };

                // Set size limit to 1GB
                const sizeLimit = 1073741824;
                if (newFile.size <= sizeLimit) {
                    this.fileService.uploadFileStorage(newFile, fileToUploadFirestore.getAsFile());

                    // Update files list
                    this.fileService.updateFileSubject();
                } else {
                    this.snackbar.displayErrorMessage('File is too big');
                }
            }
        }
    }
}
