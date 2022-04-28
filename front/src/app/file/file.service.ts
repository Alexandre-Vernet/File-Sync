import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileResponse, FileWithId, FileWithoutUrl } from './file';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserWithId } from '../authentication/user';
import { SnackbarService } from '../public/snackbar/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    filesSubject: Subject<FileWithId[]> = new BehaviorSubject<FileWithId[]>(null);
    storage = getStorage();
    user: UserWithId;
    loader = new Subject<number>();

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private snackbar: SnackbarService
    ) {
        this.auth.getAuth().then(async (user) => {
            this.user = user;
            this.updateFileSubject();
        });
    }

    updateFileSubject() {
        this.getFiles(this.user.uid).subscribe((files) => {
            this.filesSubject.next(files);
        });
    }

    getFiles(uid: string): Observable<FileWithId[]> {
        return this.http.get<FileWithId[]>(`/api/files/${ uid }`);
    }

    uploadFileFirestore(file: FileWithoutUrl): Observable<FileResponse> {
        const pushSubscriptionLocalStorage = JSON.parse(localStorage.getItem('subs'));
        return this.http.post<FileResponse>('/api/files', { file, uid: this.user.uid, pushSubscriptionLocalStorage });
    }

    uploadFileStorage(file: File, fileToUploadFirestore: Blob) {
        // Set file target in firebase storage
        const fileSource = `files/${ file.name }`;
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
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
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

    updateFile(file: FileWithId): Observable<FileResponse> {
        return this.http.put<FileResponse>(`/api/files/${ this.user.uid }/${ file.id }`, { file });
    }

    deleteFile(file: FileWithId): Observable<FileResponse> {
        return this.http.delete<FileResponse>(`/api/files/${ this.user.uid }/${ file.id }`);
    }
}
