import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { File, FileType } from '../file';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../utils.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgForOf } from '@angular/common';
import { FileCardComponent } from '../file-card/file-card.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-tabs-files',
    templateUrl: './tabs-files.component.html',
    styleUrls: ['./tabs-files.component.scss'],
    imports: [
        MatTabsModule,
        MatIconModule,
        NgForOf,
        FileCardComponent,
        CommonModule,
        MatCardModule,
        MatDialogModule
    ],
    standalone: true
})
export class TabsFilesComponent implements OnInit, OnDestroy {

    protected readonly FileType = FileType;

    files: File[] = [];

    countFilesByType = {
        [FileType.NOTE]: 0,
        [FileType.APPLICATION_TXT]: 0,
        [FileType.IMAGE]: 0,
        [FileType.APPLICATION_PDF]: 0,
        [FileType.VIDEO]: 0,
        [FileType.UNKNOWN]: 0,
    }

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        private readonly utilsService: UtilsService,
        public readonly dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.fileService.files$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((files => {
                this.files = files;
                this.setCountFilesByType();
            }));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    castTypeFile(type: string) {
        return this.utilsService.castTypeFile(type);
    }

    setCountFilesByType() {
        this.countFilesByType = {
            [FileType.NOTE]: 0,
            [FileType.APPLICATION_TXT]: 0,
            [FileType.IMAGE]: 0,
            [FileType.APPLICATION_PDF]: 0,
            [FileType.VIDEO]: 0,
            [FileType.UNKNOWN]: 0,
        };

        this.countFilesByType = this.files.reduce((acc, file) => {
            const type = this.castTypeFile(file.type);

            switch (type) {
                case FileType.NOTE:
                    acc[FileType.NOTE]++;
                    break;
                case FileType.APPLICATION_TXT:
                    acc[FileType.APPLICATION_TXT]++;
                    break;
                case FileType.IMAGE:
                    acc[FileType.IMAGE]++;
                    break;
                case FileType.APPLICATION_PDF:
                    acc[FileType.APPLICATION_PDF]++;
                    break;
                case FileType.VIDEO:
                    acc[FileType.VIDEO]++;
                    break;
                default:
                    acc[FileType.UNKNOWN]++;
            }


            return acc;
        }, { ...this.countFilesByType });
    }
}
