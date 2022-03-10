import { Component, OnInit } from '@angular/core';
import { FileWithId } from '../../../classes/file';
import { FileService } from '../../../services/authentication/file/file.service';
import { UserWithId } from '../../../classes/user';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {

    files: FileWithId[] = [];
    user: UserWithId;

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
        this.getFiles().then((files) => {
            this.files = files;
        }).catch((error) => {
            console.error(error);
        });
    }

    getFiles(): Promise<FileWithId[]> {
        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';
        return this.fileService.getFiles(uid);
    }
}
