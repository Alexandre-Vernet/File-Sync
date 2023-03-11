import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, UserWithId, UserWithPassword } from './user';
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    auth = getAuth();
    user: UserWithId;
    authUri: string = environment.authUri();

    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: SnackbarService
    ) {
    }

    async getAuth(): Promise<UserWithId> {
        return this.user;
    }

    async signInWithEmail(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    // Get token
                    const uid = userCredential.user.uid;
                    this.getToken(uid)
                        .then(() => resolve())
                        .catch(error => reject(error));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async signUp(user: UserWithPassword): Promise<UserWithId> {
        return new Promise((resolve, reject) => {
            this.http.post(`${ this.authUri }`, { user })
                .subscribe(
                    {
                        next: (res: { user: UserWithId }) => {
                            resolve(res.user);
                        },
                        error: (error) => {
                            reject(error);
                        }
                    });
        });
    }

    signInWithPopup(type: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // Get provider
            let provider;
            switch (type) {
                case'google':
                    provider = new GoogleAuthProvider();
                    break;
                case 'github':
                    provider = new GithubAuthProvider();
                    break;
                default:
                    reject('Invalid provider');
            }

            // Sign in
            signInWithPopup(this.auth, provider)
                .then(async (userCredential) => {
                    // Get token
                    const uid = userCredential.user.uid;
                    this.getToken(uid)
                        .then(() => resolve())
                        .catch(error => reject(error));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    signInWithToken(token: string): Observable<UserWithId> {
        return this.http.post<UserWithId>(`${ this.authUri }/token`, { token });
    }

    async getToken(uid: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.http.get(`${ this.authUri }/${ uid }`).subscribe(
                {
                    next: (res: { token: string }) => {
                        const { token } = res;

                        // Store token in local storage
                        localStorage.setItem('token', token);

                        resolve();
                    },
                    error: (error: HttpErrorResponse) => {
                        this.snackbar.displayErrorMessage(error.error.message);
                        reject(error);
                    }
                }
            );
        });
    }

    updateUser(user: UserWithId): Observable<UserWithId> {
        return this.http.put<UserWithId>(`${ this.authUri }/${ user.uid }`, { user });
    }

    updatePassword(password: string, newPassword: string): Promise<User> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, this.user.email, password)
                .then(() => {
                    updatePassword(this.auth.currentUser, newPassword)
                        .then(() => {
                            resolve(this.user);
                        })
                        .catch((error: HttpErrorResponse) => {
                            this.snackbar.displayErrorMessage(error.error.message());
                        });
                }).catch((error) => {
                reject(error);
            });
        });
    }

    resetPassword(emailAddress: string): void {
        sendPasswordResetEmail(this.auth, emailAddress)
            .then(() => {
                this.snackbar.displaySuccessMessage('An email has been sent to reset your password', 4000);
            })
            .catch((error: HttpErrorResponse) => {
                this.snackbar.displayErrorMessage(error.error.message);
            });
    }

    deleteUser(): Observable<string> {
        return this.http.delete<string>(`${ this.authUri }/${ this.user.uid }`);
    }

    async signOut(): Promise<void> {
        return this.auth.signOut();
    }
}

