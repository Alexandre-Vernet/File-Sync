import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileResponse, FileWithId } from './file';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    filesSubject: Subject<FileWithId[]> = new Subject<FileWithId[]>();
    storage = getStorage();

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private snackBar: MatSnackBar
    ) {
        this.auth.getAuth().then(async (user) => {
            this.getFiles(user.uid).then((files) => {
                this.filesSubject.next(files);
            });
        });

    }

    async getFiles(uid: string): Promise<FileWithId[]> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/files/${ uid }`).subscribe(
                (files: FileWithId[]) => {
                    this.filesSubject.next(files);
                    resolve(files);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async uploadFileFirestore(message: string): Promise<FileResponse> {
        return new Promise(async (resolve, reject) => {
            const user = await this.auth.getAuth();
            const date = new Date();
            const type = 'text/plain';

            const newFile: File = {
                name: message,
                date,
                type
            };

            this.http.post('/api/files', { file: newFile, uid: user.uid }).subscribe(
                (res: any) => {
                    this.getFiles(user.uid).then((files) => {
                        this.filesSubject.next(files);
                    });
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
        });
    }

    async uploadFileStorage(event): Promise<FileResponse> {
        return new Promise((resolve, reject) => {
            // Get file
            const file = event.addedFiles[0];

            // Get more info like name, type, url
            const fileName = file.name;
            const url = null;
            const type = file.type;
            const date = new Date();

            const newFile: File = {
                name: fileName,
                url,
                type,
                date
            };

            // Set file target in firebase storage
            const fileSource = `files/${ file.name }`;

            const storageRef = ref(this.storage, fileSource);

            // Upload file to firebase storage
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(ref(this.storage, fileSource))
                    .then(async (url) => {
                        newFile.url = url;
                        const user = await this.auth.getAuth();

                        // Store file in firestore
                        this.http.post(`/api/files`, { file: newFile, uid: user.uid }).subscribe(
                            (res: any) => {
                                this.getFiles(user.uid).then((files) => {
                                    this.filesSubject.next(files);
                                });
                                resolve(res);
                            }, (error) => {
                                reject(error);
                            }
                        );
                    }).catch((error: FileResponse) => {
                    reject(error);
                });
            });
        });
    }

    async updateFile(file: File, fileId: string): Promise<FileResponse> {
        const user = await this.auth.getAuth();

        return new Promise((resolve, reject) => {
            this.http.put(`/api/files/${ user.uid }/${ fileId }`, { file }).subscribe(
                (res: FileResponse) => {
                    this.getFiles(user.uid).then((files) => {
                        this.filesSubject.next(files);
                    });
                    resolve(res);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    async deleteFile(file: FileWithId): Promise<FileResponse> {
        return new Promise(async (resolve, reject) => {
            const user = await this.auth.getAuth();

            this.http.delete(`/api/files/${ user.uid }/${ file.id }`).subscribe(
                (res: FileResponse) => {
                    this.getFiles(user.uid).then((files) => {
                        this.filesSubject.next(files);
                    });
                    resolve(res);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    displayErrorMessage(error: FileResponse) {
        this.snackBar.open(error.message, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 4000,
        });
    }
}
