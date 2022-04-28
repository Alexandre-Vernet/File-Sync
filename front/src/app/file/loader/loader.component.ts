import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FileService } from '../file.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'determinate';
    loader: number = 0;

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
        this.fileService.loader.subscribe((loaderValue) => {
            this.loader = loaderValue;
        });
    }

    // Hide loader if value is 0 or 100
    hideLoader(): boolean {
        return this.loader === 0 || this.loader === 100;
    }
}
