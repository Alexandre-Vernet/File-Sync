import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../classes/user';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    auth = getAuth();
    user: User;

    constructor(
        private http: HttpClient
    ) {
    }

    async signUp(email: string, password: string) {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;


                    this.http.post('/api/user', user).subscribe(
                        (data: any) => {
                            resolve(data);
                        },
                        (error: any) => {
                            reject(error);
                        }
                    );
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        });
    }
}

