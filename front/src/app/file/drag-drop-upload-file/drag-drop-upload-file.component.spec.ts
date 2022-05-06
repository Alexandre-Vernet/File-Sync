import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropUploadFileComponent } from './drag-drop-upload-file.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneComponent, NgxDropzoneLabelDirective } from 'ngx-dropzone';

describe('DragDropUploadFileComponent', () => {
    let component: DragDropUploadFileComponent;
    let fixture: ComponentFixture<DragDropUploadFileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DragDropUploadFileComponent, NgxDropzoneComponent, NgxDropzoneLabelDirective],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                BrowserAnimationsModule
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DragDropUploadFileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
