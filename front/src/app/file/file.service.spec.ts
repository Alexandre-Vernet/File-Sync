import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserWithId } from '../authentication/user';
import { FileWithId } from './file';
import { AuthenticationService } from '../authentication/authentication.service';

describe('FileService', () => {
    let service: FileService;
    let user: UserWithId = {
        displayName: 'Alexandre Vernet',
        email: 'alexandre.vernet@g-mail.fr',
        uid: 'OEe3li0OEhNxvECIweMfD0flvA63'
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

            const mock: FileWithId = {
                url: 'https://firebasestorage.googleapis.com/v0/b/media-share-4f34a.appspot.com/o/files%2Fwp2818490.jpg?alt=media&token=4218fbb8-262b-45bd-848e-16bad5f91582',
                date: new Date('2022-05-06T15:39:10.405Z'),
                id: 'ndynx4p9amrw808oktqmdm',
                name: 'wp2818490.jpg',
                size: 348578,
                type: 'image/jpeg'
            };

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
