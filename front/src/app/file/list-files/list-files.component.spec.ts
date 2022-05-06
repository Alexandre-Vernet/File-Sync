import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilesComponent } from './list-files.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from '../file.service';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';
import { MatChipsModule } from '@angular/material/chips';
import { FilePipe } from '../file.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

describe('ListMediasComponent', () => {
    let component: ListFilesComponent;
    let fixture: ComponentFixture<ListFilesComponent>;

    beforeEach(async () => {
        initializeApp(firebaseConfig);


        await TestBed.configureTestingModule({
            providers: [FileService],
            declarations: [ListFilesComponent, FilePipe],
            imports: [
                MatDialogModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatChipsModule,
                MatIconModule,
                MatCardModule
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListFilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
