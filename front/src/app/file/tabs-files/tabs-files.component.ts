import { Component, OnInit } from '@angular/core';
import { UserWithId } from '../../authentication/user';
import { FileService } from '../file.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { FileWithId } from '../file';
import { DialogUpdateFileComponent } from '../list-files/list-files.component';

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

    openDialogUpdateFile(file: FileWithId) {
        this.dialog.open(DialogUpdateFileComponent, { data: file });
    }

    castTypeFile(type: string): string {
        // Get the type of file before the slash (text/plain -> text)
        return type.split('/')[0];
    }

    convertDate(date: Date): string {
        return moment(date).startOf('minutes').fromNow();
    }


    deleteFile(file: FileWithId): void {
        this.fileService.deleteFile(file).then(() => {
            this.files = this.files.filter((m) => m.id !== file.id);
        }).catch((error) => {
            this.fileService.displayErrorMessage(error);
        });
    }
}
