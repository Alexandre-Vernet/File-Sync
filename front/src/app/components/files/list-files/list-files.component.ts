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
        this.getFiles().then((files: File[]) => {
            this.files = files;
        }).catch((error) => {
            console.log(error);
        });
    }

    getFiles() {
        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';
        return this.fileService.getFiles(uid);
    }
}
