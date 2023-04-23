import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileWithId, FileWithoutUrl } from './file';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { UserWithId } from '../authentication/user';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { app, environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    filesSubject: Subject<FileWithId[]> = new BehaviorSubject<FileWithId[]>(null);
    storage = getStorage();
    user: UserWithId;
    loader = new Subject<number>();
    fileUri: string = `${ environment.backendUrl }/files`;
    db = getFirestore(app);

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private snackbar: SnackbarService,
        private router: Router
    ) {
        this.auth
            .getAuth()
            .then(async (user) => {
                this.user = user;
                this.updateFileSubject();
            })
            .catch(async () => {
                await this.router.navigateByUrl('/');
            });
    }

    updateFileSubject() {
        onSnapshot(doc(this.db, 'files', this.user.uid), (doc) => {
            const files: FileWithId[] = [];
            for (const filesKey in doc.data()) {
                files.push({
                    id: filesKey,
                    name: doc.data()[filesKey].name,
                    url: doc.data()[filesKey].url,
                    size: doc.data()[filesKey].size,
                    type: doc.data()[filesKey].type,
                    date: doc.data()[filesKey].date
                });
            }

            // Sort files by date
            files.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            this.filesSubject.next(files);
        });
    }

    uploadFileFirestore(file: FileWithoutUrl): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.fileUri, { file, uid: this.user.uid })
            .pipe(
                catchError(err => {
                    this.snackbar.displayErrorMessage(err.error.message);
                    return EMPTY;
                })
            );
    }

    uploadFileStorage(file: File, fileToUploadFirestore: Blob) {
        // Set file target in firebase storage
        const fileSource = `files/${ this.auth.user.uid }/${ file.name }`;
        const storageRef = ref(this.storage, fileSource);

        // Upload file to firebase storage
        const upload = uploadBytesResumable(storageRef, fileToUploadFirestore);

        // Listen for state changes, errors, and completion of the upload.
        upload.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.loader.next(progress);
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        this.snackbar.displayErrorMessage('You don\'t have permission to access this file');
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        this.snackbar.displayErrorMessage('You canceled the upload');
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        this.snackbar.displayErrorMessage('Unknown error occurred');
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                        file.url = downloadURL;

                        // Upload file to firestore
                        this.uploadFileFirestore(file).subscribe((res) => {
                            // Display success message
                            this.snackbar.displaySuccessMessage(res.message);

                            // Update file subject
                            this.updateFileSubject();
                        });
                    }
                );
            });
    }

    updateFile(file: FileWithId): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${ this.fileUri }/${ this.user.uid }/${ file.id }`, { file })
            .pipe(
                catchError(err => {
                    this.snackbar.displayErrorMessage(err.error.message);
                    return EMPTY;
                })
            );
    }

    deleteFile(file: FileWithId): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${ this.fileUri }/${ this.user.uid }/${ file.id }`)
            .pipe(
                catchError(err => {
                    this.snackbar.displayErrorMessage(err.error.message);
                    return EMPTY;
                })
            );
    }

    deleteAllFiles(): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${ this.fileUri }/deleteAll`, { uid: this.user.uid })
            .pipe(
                catchError(err => {
                    this.snackbar.displayErrorMessage(err.error.message);
                    return EMPTY;
                })
            );
    }
}
