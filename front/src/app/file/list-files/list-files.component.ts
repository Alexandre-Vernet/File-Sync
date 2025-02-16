import { Component, OnDestroy, OnInit } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit, OnDestroy {

    files: File[] = [];
    filteredFiles: File[] = [];

    searchBar: string;

    // Pagination
    pageSize = 10;

    errorMessage: string;

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
        // Sort by date
        if (type === 'date') {
            this.filteredFiles.sort((a, b) => {
                return moment(a.date).isBefore(b.date) ? 1 : -1;
            });

            // Sort by name
        } else if (type === 'name') {
            this.filteredFiles.sort((a, b) => {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });

            // Sort by size ASC
        } else if (type === 'size') {
            this.filteredFiles.sort((a, b) => {
                return a.size < b.size ? 1 : -1;
            });

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

    setErrorMessage($event: string) {
        this.errorMessage = $event;
    }
}
