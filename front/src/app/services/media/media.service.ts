import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media, MediaWithId } from '../../classes/media';
import { Response } from '../../classes/response';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Message } from 'src/app/classes/message';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    storage = getStorage();

    constructor(
        private http: HttpClient
    ) {
    }

    async getFiles(uid: string): Promise<MediaWithId[]> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/files/${ uid }`).subscribe(
                (files: MediaWithId[]) => {
                    resolve(files);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async uploadMessage(message: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';
            const date = new Date();
            const newMessage: Message = {
                message,
                date
            };

            this.http.post('/api/files', { message: newMessage, uid }).subscribe(
                (res: Response) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
        });
    }

    async uploadFile(event): Promise<Response> {
        return new Promise((resolve, reject) => {
            // Get media
            const file = event.target.files[0];

            // Get more info like name, type, url
            const fileName = file.name;
            const url = null;
            const type = file.type;
            const date = new Date();

            const newFile: Media = {
                name: fileName,
                url,
                type,
                date
            };

            // Set media target in firebase storage
            const fileSource = `files/${ file.name }`;

            const storageRef = ref(this.storage, fileSource);

            // Upload media to firebase storage
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(ref(this.storage, fileSource))
                    .then(async (url) => {
                        newFile.url = url;
                        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';

                        // Store media in firestore
                        this.http.post(`/api/files`, { file: newFile, uid }).subscribe(
                            (res: Response) => {
                                resolve(res);
                            }, (error) => {
                                reject(error);
                            }
                        );
                    }).catch((error) => {
                    reject(error);
                });
            });
        });
    }
}
