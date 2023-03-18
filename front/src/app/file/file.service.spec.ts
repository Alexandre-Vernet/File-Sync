import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FileService', () => {
    let service: FileService;

    beforeEach(() => {
        jest.setTimeout(30000);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule
            ],
        });
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
