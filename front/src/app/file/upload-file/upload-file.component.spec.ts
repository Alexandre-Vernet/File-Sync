import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileComponent } from './upload-file.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropUploadFileComponent } from '../drag-drop-upload-file/drag-drop-upload-file.component';
import { LoaderComponent } from '../loader/loader.component';
import { NgxDropzoneComponent, NgxDropzoneLabelDirective } from 'ngx-dropzone';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UploadFileComponent', () => {
    let component: UploadFileComponent;
    let fixture: ComponentFixture<UploadFileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadFileComponent, DragDropUploadFileComponent, LoaderComponent, NgxDropzoneComponent, NgxDropzoneLabelDirective
            ],
            imports: [
                MatFormFieldModule,
                MatInputModule,
                FormsModule,
                ReactiveFormsModule,
                MatProgressSpinnerModule,
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                BrowserAnimationsModule
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadFileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
