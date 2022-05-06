import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ObserversModule } from '@angular/cdk/observers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async () => {
        initializeApp(firebaseConfig);


        await TestBed.configureTestingModule({
            declarations: [SignUpComponent],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                ObserversModule,
                MatSnackBarModule,
                MatFormFieldModule,
                MatInputModule

            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
