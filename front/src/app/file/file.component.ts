import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';
import { FileWithId } from './file';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

    files: FileWithId[] = [];

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit() {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });
    }
}
