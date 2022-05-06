import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../public/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async () => {
        initializeApp(firebaseConfig);

        await TestBed.configureTestingModule({
            declarations: [UserProfileComponent, NavbarComponent],
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
                IonicModule,
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
