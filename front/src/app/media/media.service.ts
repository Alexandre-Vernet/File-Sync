import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media, MediaWithId } from './media';
import { Response } from '../response';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    storage = getStorage();

    constructor(
        private http: HttpClient
    ) {
    }

    async getMedias(uid: string): Promise<MediaWithId[]> {
        return new Promise((resolve, reject)  => {
            this.http.get(`/api/medias/${ uid }`).subscribe(
                (medias: MediaWithId[]) => {
                    resolve(medias);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async uploadMediaFirestore(message: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';
            const date = new Date();

            const newMedia: Media = {
                name: message,
                date
            };

            this.http.post('/api/medias', { media: newMedia, uid }).subscribe(
                (res: Response) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
        });
    }

    async uploadMediaStorage(event): Promise<Response> {
        return new Promise((resolve, reject) => {
            // Get media
            const file = event.target.files[0];

            // Get more info like name, type, url
            const fileName = file.name;
            const url = null;
            const type = file.type;
            const date = new Date();

            const newMedia: Media = {
                name: fileName,
                url,
                type,
                date
            };

            // Set media target in firebase storage
            const fileSource = `medias/${ file.name }`;

            const storageRef = ref(this.storage, fileSource);

            // Upload media to firebase storage
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(ref(this.storage, fileSource))
                    .then(async (url) => {
                        newMedia.url = url;
                        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';

                        // Store media in firestore
                        this.http.post(`/api/medias`, { media: newMedia, uid }).subscribe(
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
