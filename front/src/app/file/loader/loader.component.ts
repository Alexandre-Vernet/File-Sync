import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

    loader: number = 0;

    unsubscribe$ = new Subject<void>();

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit() {
        this.fileService.loader$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(loaderValue => this.loader = loaderValue);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // Hide loader if value is 0 or 100
    hideLoader() {
        return this.loader === 0 || this.loader === 100;
    }
}
