import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    imports: [
        NgClass,
        MatProgressSpinnerModule
    ],
    standalone: true
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
}
