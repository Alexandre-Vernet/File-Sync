import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../authentication/user';
import { FileService } from '../file.service';
import { MatDialog } from '@angular/material/dialog';
import { File } from '../file';
import { FilePipe } from '../file.pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-tabs-files',
    templateUrl: './tabs-files.component.html',
    styleUrls: ['./tabs-files.component.scss']
})
export class TabsFilesComponent implements OnInit, OnDestroy {
    files: File[] = [];
    user: User;

    unsubscribe$ = new Subject<void>();

    constructor(
        private readonly fileService: FileService,
        public readonly dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.fileService.files$
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe((files => this.files = files));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    castTypeFile(type: string) {
        return new FilePipe().castTypeFile(type);
    }
}
