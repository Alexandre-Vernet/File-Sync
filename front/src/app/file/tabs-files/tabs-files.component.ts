import { Component, OnInit } from '@angular/core';
import { UserWithId } from '../../authentication/user';
import { FileService } from '../file.service';
import { MatDialog } from '@angular/material/dialog';
import { File, FileWithId } from '../file';

@Component({
    selector: 'app-tabs-files',
    templateUrl: './tabs-files.component.html',
    styleUrls: ['./tabs-files.component.scss']
})
export class TabsFilesComponent implements OnInit {

    files: FileWithId[] = [];
    user: UserWithId;

    constructor(
        private fileService: FileService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
        });
    }

    hasFile(type: string): boolean {
        type = this.castTypeFile(type);
        // Find in files if this type exists
        const file = this.files.find((file) => this.castTypeFile(file.type) === type);
        return !!file;
    }


    castTypeFile(type: string): string {
        return File.castTypeFile(type);
    }
}
