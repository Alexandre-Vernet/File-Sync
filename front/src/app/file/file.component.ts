import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

    constructor(
        private notification: NotificationService
    ) {
    }

    ngOnInit() {
        this.notification.subscribeNotification();
    }
}
