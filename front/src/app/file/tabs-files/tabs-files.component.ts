import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { File, FileType } from '../file';
import { map, Subject, takeUntil } from 'rxjs';
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

    files: File[] = [];

    fileTypes = [
        { key: FileType.NOTE, label: 'Note', icon: 'format_color_text', class: 'text-color' },
        { key: FileType.APPLICATION_TXT, label: 'Text', icon: 'description', class: 'txt-color' },
        { key: FileType.IMAGE, label: 'Image', icon: 'image', class: 'image-color' },
        { key: FileType.APPLICATION_PDF, label: 'PDF', icon: 'file_copy', class: 'pdf-color' },
        { key: FileType.VIDEO, label: 'Video', icon: 'movie', class: 'video-color' },
        { key: FileType.APPLICATION_ZIP, label: 'Archive', icon: 'archive', class: 'zip-color' },
        { key: FileType.UNKNOWN, label: 'Unknown', icon: 'description', class: 'unknown-color' }
    ];

    countFilesByType: Record<FileType, number> = {} as Record<FileType, number>;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        private readonly utilsService: UtilsService,
        public readonly dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.fileService.files$
            .pipe(
                takeUntil(this.unsubscribe$),
                map(files => files.map(f => ({
                        ...f,
                        type: this.utilsService.getFileType(f.type)
                    }))
                )
            )
            .subscribe((files => {
                this.files = files;
                this.setCountFilesByType();
            }));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    setCountFilesByType() {
        this.countFilesByType = Object.values(FileType).reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as Record<FileType, number>);

        this.countFilesByType = this.files.reduce((acc, file) => {
            acc[file.type]++;

            return acc;
        }, { ...this.countFilesByType });
    }
}
