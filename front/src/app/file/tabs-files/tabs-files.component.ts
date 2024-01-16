import { Component, OnDestroy } from '@angular/core';
import { UserWithId } from '../../authentication/user';
import { FileService } from '../file.service';
import { MatDialog } from '@angular/material/dialog';
import { FileWithId } from '../file';
import { FilePipe } from '../file.pipe';
import { distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-tabs-files',
    templateUrl: './tabs-files.component.html',
    styleUrls: ['./tabs-files.component.scss']
})
export class TabsFilesComponent implements OnDestroy {
    unsubscribe$ = new Subject<void>();

    files$: Observable<FileWithId[]> = this.fileService.files$.pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
        map(files =>  files)
    );
    user: UserWithId;

    constructor(
        private fileService: FileService,
        public dialog: MatDialog,
    ) {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    castTypeFile(type: string): string {
        return new FilePipe().castTypeFile(type);
    }
}
