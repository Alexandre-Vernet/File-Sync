import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserWithId } from '../authentication/user';
import { AuthenticationService } from '../authentication/authentication.service';

describe('FileService', () => {
    let service: FileService;
    let user: UserWithId = {
        displayName: 'Alexandre Vernet',
        email: 'alexandre.vernet@g-mail.fr',
        uid: 'OEe3li0OEhNxvECIweMfD0flvA63',
        emailVerified: true
    };

    beforeEach((done) => {
        jest.setTimeout(30000);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule
            ],
        });

        // Mock the authentication service
        let auth: AuthenticationService;
        auth = TestBed.inject(AuthenticationService);
        auth.user = user;
        service = TestBed.inject(FileService);

        done();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getFiles', () => {
        it('should return an array of files', (done) => {

            service.getFiles(user.uid).subscribe(files => {
                console.log(files);
                expect(files.length).toBeGreaterThan(0);
                done();
            }, (error) => {
                console.log(error);
            });
        });
    });
});
