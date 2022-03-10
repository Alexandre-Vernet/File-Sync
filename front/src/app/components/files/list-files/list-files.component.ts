import { Component, OnInit } from '@angular/core';
import { File } from '../../../classes/file';
import { FileService } from '../../../services/authentication/file/file.service';
import { UserWithId } from '../../../classes/user';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {

    files: File[] = [];
    user: UserWithId;

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
        this.getFiles();
    }

    getFiles() {
        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';
        this.fileService.getFiles(uid).then((files: File[]) => {
            this.files = files;
        }).catch((error) => {
            console.error(error);
        });
    }

}
