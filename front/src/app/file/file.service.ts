import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileResponse, FileWithId, FileWithoutUrl } from './file';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserWithId } from '../authentication/user';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    filesSubject: Subject<FileWithId[]> = new BehaviorSubject<FileWithId[]>(null);
    storage = getStorage();
    user: UserWithId;

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private snackBar: MatSnackBar
    ) {
        this.auth.getAuth().then(async (user) => {
            this.user = user;
            this.updateFileSubject();
        });
    }

    updateFileSubject() {
        this.getFiles(this.user.uid).subscribe((files) => {
            this.filesSubject.next(files);
        });
    }

    getFiles(uid: string): Observable<FileWithId[]> {
        return this.http.get<FileWithId[]>(`/api/files/${ uid }`);
    }

    uploadFileFirestore(name: string): Observable<FileResponse> {
        const date = new Date();
        const type = 'text/plain';

        const newFile: FileWithoutUrl = {
            name,
            type,
            date
        };

        return this.http.post<FileResponse>('/api/files', { file: newFile, uid: this.user.uid });
    }

    async uploadFileStorage(file): Promise<FileResponse> {
        return new Promise((resolve) => {
            // Get more info like name, type
            const name = file.name;
            const url = null;
            const type = file.type;
            const date = new Date();

            const newFile = new File(
                name,
                url,
                type,
                date
            );


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
                            (res: FileResponse) => {
                                this.updateFileSubject();
                                resolve(res);
                            }
                        );
                    });
            });
        });
    }

    updateFile(file: FileWithId): Observable<FileResponse> {
        return this.http.put<FileResponse>(`/api/files/${ this.user.uid }/${ file.id }`, { file });
    }

    deleteFile(file: FileWithId): Observable<FileResponse> {
        return this.http.delete<FileResponse>(`/api/files/${ this.user.uid }/${ file.id }`);
    }

    displaySuccessMessage(message: string) {
        this.snackBar.open(message, '', {
            duration: 2000,
            panelClass: ['success-snackbar']
        });
    }
}
