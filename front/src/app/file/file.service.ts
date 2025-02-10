import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from './file';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { BehaviorSubject, filter, Subject, switchMap, take, tap } from 'rxjs';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { app, environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    fileUri: string = `${ environment.backendUrl }/files`;

    private filesSubject = new BehaviorSubject<File[]>([]);
    files$ = this.filesSubject.asObservable();

    loader$ = new Subject<number>();

    constructor(
        private readonly http: HttpClient,
        private readonly auth: AuthenticationService,
    ) {
        this.auth.user$.pipe(
            filter(user => !!user),
            take(1),
            tap(user => {
                onSnapshot(doc(getFirestore(app), 'files', user.uid), (doc) => {
                    const files: File[] = [];
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
                    files.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    this.filesSubject.next(files);
                });
            })
        ).subscribe();
    }

    uploadFileFirestore(file: File) {
        return this.auth.user$
            .pipe(
                filter(user => !!user),
                take(1),
                switchMap(user => this.http.post(this.fileUri, { file, uid: user.uid }))
            );
    }

    uploadFileStorage(file: File, fileToUploadFirestore: Blob) {
        return this.auth.user$.pipe(
            filter(user => !!user),
            take(1),
            tap(user => {
                // Set file target in firebase storage
                const fileSource = `files/${ user.uid }/${ file.name }`;
                const storageRef = ref(getStorage(), fileSource);

                // Upload file to firebase storage
                const upload = uploadBytesResumable(storageRef, fileToUploadFirestore);

                // Listen for state changes, errors, and completion of the upload.
                upload.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.loader$.next(progress);
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                return 'You don\'t have permission to access this file';
                            default:
                                return 'Unknown error occurred';
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(upload.snapshot.ref)
                            .then((downloadURL) => {
                                    file.url = downloadURL;

                                    // Upload file to firestore
                                    this.uploadFileFirestore(file)
                                        .pipe(take(1))
                                        .subscribe(() => this.filesSubject.next([...this.filesSubject.value, file]));
                                }
                            );
                    });
            }),
        );
    }

    updateFile(file: File) {
        return this.auth.user$.pipe(
            filter(user => !!user),
            take(1),
            switchMap(user =>
                this.http.put<File>(`${ this.fileUri }/${ user.uid }/${ file.id }`, { file })
                    .pipe(
                        tap(updatedFile => this.filesSubject.next([...this.filesSubject.value, updatedFile]))
                    )
            )
        );
    }

    deleteFile(file: File) {
        return this.auth.user$.pipe(
            filter(user => !!user),
            take(1),
            switchMap(user => this.http.delete(`${ this.fileUri }/${ user.uid }/${ file.id }`))
        );
    }

    deleteAllFiles() {
        return this.auth.user$.pipe(
            filter(user => !!user),
            take(1),
            switchMap(user => this.http.post(`${ this.fileUri }/deleteAll`, { uid: user.uid }))
        );
    }
}
