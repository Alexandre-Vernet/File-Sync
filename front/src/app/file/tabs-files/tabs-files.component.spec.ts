import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFilesComponent } from './tabs-files.component';
import { FileService } from '../file.service';
import { FilePipe } from '../file.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

describe('TabsFilesComponent', () => {
    let component: TabsFilesComponent;
    let fixture: ComponentFixture<TabsFilesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({

            providers: [FileService],
            declarations: [TabsFilesComponent, FilePipe],
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
                MatCardModule,
                MatTabsModule
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsFilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
