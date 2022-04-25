import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';
import { FileWithId } from './file';
import { NotificationService } from '../notification/notification.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

    files: FileWithId[] = [];

    constructor(
        private fileService: FileService,
        private notification: NotificationService,
        private auth: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });

        this.auth.getAuth().then((user) => {
            this.notification.subscribeNotification(user);
        });
    }
}
