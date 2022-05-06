import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ObserversModule } from '@angular/cdk/observers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;

    beforeEach(async () => {
        initializeApp(firebaseConfig);

        await TestBed.configureTestingModule({
            declarations: [SignInComponent,
            ],
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
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
