import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification/notification.service';
import { environment } from '../../environments/environment';
import { FileService } from './file.service';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

    constructor(
        private notification: NotificationService,
        private fileService: FileService
    ) {
    }

    ngOnInit() {
        environment.production ? this.notification.subscribeNotification() : null;
        this.fileService.connectSocket();
    }
}
