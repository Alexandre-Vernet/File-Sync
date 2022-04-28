import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileResponse, FileWithId, FileWithoutUrl } from './file';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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
        uploadBytes(storageRef, fileToUploadFirestore).then(() => {
            getDownloadURL(ref(this.storage, fileSource))
                .then((url) => {
                    // Set URL
                    file.url = url;
                }).then(() => {
                // Upload file to firestore
                this.uploadFileFirestore(file).subscribe((res) => {
                    // Display success message
                    this.snackbar.displaySuccessMessage(res.message);

                    // Update file subject
                    this.updateFileSubject();
                });
            });
        });
    }

    updateFile(file: FileWithId): Observable<FileResponse> {
        return this.http.put<FileResponse>(`/api/files/${ this.user.uid }/${ file.id }`, { file });
    }

    deleteFile(file: FileWithId): Observable<FileResponse> {
        return this.http.delete<FileResponse>(`/api/files/${ this.user.uid }/${ file.id }`);
    }
}
