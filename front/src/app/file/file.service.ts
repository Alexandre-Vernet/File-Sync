import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileResponse, FileWithId } from './file';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UserWithId } from '../authentication/user';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    user: UserWithId;

    storage = getStorage();

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private snackBar: MatSnackBar

    ) {
        setTimeout(() => {
            this.auth.getAuth().then((user) => {
                this.user = user;
            });
        }, 1000);
    }

    async getFiles(uid: string): Promise<FileWithId[]> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/files/${ uid }`).subscribe(
                (files: FileWithId[]) => {
                    resolve(files);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async uploadFileFirestore(message: string): Promise<FileResponse> {
        return new Promise((resolve, reject) => {
            const uid = this.user.uid;
            const date = new Date();
            const type = 'text/plain';

            const newFile: File = {
                name: message,
                date,
                type
            };

            this.http.post('/api/files', { file: newFile, uid }).subscribe(
                (res: FileResponse) => {
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
                        const uid = this.user.uid;

                        // Store file in firestore
                        this.http.post(`/api/files`, { file: newFile, uid }).subscribe(
                            (res: FileResponse) => {
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
        const uid = this.user.uid;
        return new Promise((resolve, reject) => {
            this.http.put(`/api/files/${ uid }/${ fileId }`, { file }).subscribe(
                (res: FileResponse) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    async deleteFile(file: FileWithId): Promise<FileResponse> {
        return new Promise((resolve, reject) => {
            const uid = this.user.uid;

            this.http.delete(`/api/files/${ uid }/${ file.id }`).subscribe(
                (res: FileResponse) => {
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
