import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileWithId } from '../../../classes/file';
import { Response } from '../../../classes/response';

@Injectable({
    providedIn: 'root'
})
export class FileService {

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

    async uploadFile(file: File, uid: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            this.http.post('/api/files', { file, uid }).subscribe(
                (res: Response) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
        });
    }
}
