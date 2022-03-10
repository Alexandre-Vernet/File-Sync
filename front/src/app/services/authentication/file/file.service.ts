import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../../../classes/file';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private http: HttpClient
    ) {
    }

    async getFiles(uid: string) {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/files/${ uid }`).subscribe(
                (files: File[]) => {
                    console.log(files);
                    resolve(files);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async uploadFile(file, uid: string) {
        this.http.post('/api/files', { file, uid }).subscribe(
            (res) => {
                console.log(res);
            }, (error) => {
                console.error(error);
            });
    }
}
