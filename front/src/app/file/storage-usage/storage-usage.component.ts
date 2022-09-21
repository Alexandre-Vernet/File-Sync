import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';

@Component({
    selector: 'app-storage-usage',
    templateUrl: './storage-usage.component.html',
    styleUrls: ['./storage-usage.component.scss']
})
export class StorageUsageComponent implements OnInit {
    storageUsage = {
        totalFilesSize: '0',
        progressBarValue: 0
    };

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
        this.fileService.filesSubject.subscribe((files) => {
            if (files) {
                const totalSize = File.getTotalSize(files);

                // Convert files size in percentage (5GB = 100%)
                this.storageUsage.progressBarValue = Math.round(totalSize / 5000000000 * 100);

                // Display total files size
                this.storageUsage.totalFilesSize = File.convertSize(totalSize);
            }
        });
    }

}
