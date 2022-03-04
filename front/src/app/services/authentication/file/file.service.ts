import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private http: HttpClient
    ) {
    }

    async uploadFile(file) {
        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';

        this.http.post('/api/files', { file, uid }).subscribe(
            (res) => {
                console.log(res);
            }, (error) => {
                console.error(error);
            });
    }
}
