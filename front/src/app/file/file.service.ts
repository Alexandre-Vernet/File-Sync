import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from './file';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { BehaviorSubject, filter, map, Observable, of, Subject, switchMap, take, tap } from 'rxjs';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { app, environment } from '../../environments/environment';
import { User } from '../authentication/user';

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
        this.auth.user$
            .pipe(
                take(1),
                filter(user => !!user),
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

    uploadFileFirestore(file: File, fileToUploadFirestore?: Blob | null) {
        return this.auth.user$
            .pipe(
                take(1),
                filter(user => !!user),
                switchMap(user => {
                    if (!fileToUploadFirestore) {
                        return of({ file, user });
                    } else {
                        return this.uploadToFirebase(file, fileToUploadFirestore, user)
                    }
                }),
                switchMap(({ file, user }) => this.http.post<File>(this.fileUri, { file, uid: user.uid })),
            );
    }

    private uploadToFirebase(file: File, fileToUploadFirestore: Blob | null, user: User) {
        const fileSource = `files/${ user.uid }/${ file.name }`;
        const storageRef = ref(getStorage(), fileSource);
        const upload = uploadBytesResumable(storageRef, fileToUploadFirestore);

        return new Observable<{ downloadURL: string, user: User }>(observer => {
            upload.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.loader$.next(progress);
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            observer.error('You don\'t have permission to access this file');
                            break;
                        default:
                            observer.error('Unknown error occurred');
                    }
                },
                () => {
                    getDownloadURL(upload.snapshot.ref)
                        .then(downloadURL => {
                            file.url = downloadURL;
                            observer.next({ downloadURL, user });
                            observer.complete();
                        })
                        .catch(err => observer.error(err));
                });
        }).pipe(
            map(({ downloadURL, user }) => ({ file: { ...file, url: downloadURL }, user }))
        );
    }

    updateFile(file: File) {
        return this.auth.user$
            .pipe(
                take(1),
                filter(user => !!user),
                switchMap(user => this.http.put<{ message: string }>(`${ this.fileUri }/${ user.uid }/${ file.id }`, {
                    uid: user.uid,
                    file
                }))
            );
    }

    deleteFile(file: File) {
        return this.auth.user$
            .pipe(
                take(1),
                filter(user => !!user),
                switchMap(user => this.http.delete<File>(`${ this.fileUri }/${ user.uid }/${ file.id }`))
            );
    }

    deleteAllFiles() {
        return this.auth.user$
            .pipe(
                take(1),
                filter(user => !!user),
                switchMap(user => this.http.post(`${ this.fileUri }/deleteAll`, { uid: user.uid }))
            );
    }

    resetFileSubject() {
        this.filesSubject.next([]);
    }
}
