import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileWithId } from '../../classes/file';
import { Response } from '../../classes/response';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    storage = getStorage();

    constructor(
        private http: HttpClient
    ) {
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

    async uploadMessage(file: File, uid: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            this.http.post('/api/files', { file, uid }).subscribe(
                (res: Response) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
        });
    }

    async uploadFile(event): Promise<Response> {
        return new Promise((resolve, reject) => {
            // Get file
            const file = event.target.files[0];

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

            // Set file source
            const fileSource = `files/${ file.name }`;

            const storageRef = ref(this.storage, fileSource);

            // Upload file to firebase storage
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(ref(this.storage, fileSource))
                    .then(async (url) => {
                        resolve({
                            status: 'success',
                            message: 'File uploaded',
                        });
                        // const messageId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        //
                        // const message = {
                        //     [this.user.id]: {
                        //         [messageId]: {
                        //             file: {
                        //                 name: newFile.name,
                        //                 url: url,
                        //                 type: newFile.type,
                        //             },
                        //             date: new Date(),
                        //         }
                        //     }
                        // };
                        //
                        // // Upload file to firestore
                        // await this.firestore.sendMessage(conversationId, 'message', message);
                    }).catch((error) => {
                    reject(error);
                });
            });
        });
    }
}
