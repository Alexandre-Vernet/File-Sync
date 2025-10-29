import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { File, FileType, fileTypes } from '../file';
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

    protected readonly fileTypes = fileTypes;

    files: File[] = [];

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
        console.log( this.countFilesByType)
    }
}
