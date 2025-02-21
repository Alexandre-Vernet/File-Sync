import { Component, OnDestroy, OnInit } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FileCardComponent } from '../file-card/file-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FilePipe } from '../file.pipe';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss'],
    imports: [
        MatChipsModule,
        CommonModule,
        FileCardComponent,
        MatPaginatorModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        FilePipe,
        MatDialogModule
    ],
    standalone: true
})
export class ListFilesComponent implements OnInit, OnDestroy {

    files: File[] = [];
    filteredFiles: File[] = [];

    searchBar: string;

    // Pagination
    pageSize = 10;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService
    ) {
    }

    ngOnInit() {
        this.fileService.files$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(files => {
                this.files = files;
                this.filteredFiles = files.slice(0, this.pageSize);
            })
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    clearSearchBar() {
        this.searchBar = '';
        this.filteredFiles = this.files.slice(0, this.pageSize);
    }

    onPageChange($event) {
        this.filteredFiles = this.files.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);

    }

    orderBy(type: 'date' | 'name' | 'size' | 'type') {
        if (type === 'date') {
            this.filteredFiles.sort((a, b) => moment(a.date).isBefore(b.date) ? 1 : -1);
        } else if (type === 'name') {
            this.filteredFiles.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        } else if (type === 'size') {
            this.filteredFiles.sort((a, b) => a.size < b.size ? 1 : -1);
        } else if (type === 'type') {
            this.filteredFiles.sort((a, b) => {
                if (a[type] < b[type]) {
                    return -1;
                }
                if (a[type] > b[type]) {
                    return 1;
                }
                return 0;
            });
        }
    }
}
