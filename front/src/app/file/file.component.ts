import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';
import { FileWithId } from './file';
import { NotificationService } from '../notification/notification.service';
import { environment } from '../../environments/environment';

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
    ) {
    }

    ngOnInit() {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });
        environment.production ? this.notification.subscribeNotification() : null;
    }
}
