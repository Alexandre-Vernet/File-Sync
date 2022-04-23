import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File, FileResponse, FileWithId, FileWithoutUrl } from './file';
import { getStorage } from 'firebase/storage';
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

    uploadFileFirestore(file: FileWithoutUrl): Observable<FileResponse> {
        return this.http.post<FileResponse>('/api/files', { file, uid: this.user.uid });
    }

    uploadFileStorage(file: File): Observable<FileResponse> {
        return this.http.post<FileResponse>(`/api/files`, { file, uid: this.user.uid });
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
