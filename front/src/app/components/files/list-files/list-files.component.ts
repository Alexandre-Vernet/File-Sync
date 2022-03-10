import { Component, OnInit } from '@angular/core';
import { FileWithId } from '../../../classes/file';
import { FileService } from '../../../services/authentication/file/file.service';
import { UserWithId } from '../../../classes/user';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {

    files: FileWithId[] = [];
    user: UserWithId;

    constructor(
        private fileService: FileService,
        private auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.auth.getAuth().then((user) => {
            console.log(user);
            this.getFiles().then((files) => {
                this.files = files;
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    getFiles(): Promise<FileWithId[]> {
        return this.fileService.getFiles(this.user.uid);
    }
}
