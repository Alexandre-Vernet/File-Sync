import { Component, OnInit } from '@angular/core';
import { FileWithId } from '../file';
import { FileService } from '../file.service';
import moment from 'moment';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {
    files?: FileWithId[] = [];
    searchBar: string;

    // Pagination
    filesToShow: FileWithId[] = [];
    pageSize = 10;

    constructor(
        private fileService: FileService,
    ) {
    }

    ngOnInit() {
        this.fileService.filesSubject.subscribe((files) => {
            this.files = files;
            if (files) {
                this.filesToShow = this.files.slice(0, this.pageSize);
            }
        });
    }

    clearSearchBar() {
        this.searchBar = '';
        this.filesToShow = this.files.slice(0, this.pageSize);
    }

    onPageChange($event) {
        this.filesToShow = this.files.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
    }

    orderBy(type: string) {
        // Sort by date
        if (type === 'date') {
            this.filesToShow.sort((a, b) => {
                return moment(a.date).isBefore(b.date) ? 1 : -1;
            });

            // Sort by name
        } else if (type === 'name') {
            this.filesToShow.sort((a, b) => {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });

            // Sort by size ASC
        } else if (type === 'size') {
            this.filesToShow.sort((a, b) => {
                return a.size < b.size ? 1 : -1;
            });

        } else {
            this.filesToShow.sort((a, b) => {
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
