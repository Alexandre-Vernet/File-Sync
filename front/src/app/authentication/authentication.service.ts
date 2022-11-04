import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, UserWithId, UserWithPassword } from './user';
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { FileResponse } from '../file/file';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    auth = getAuth();
    user: UserWithId;

    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: SnackbarService
    ) {
    }

    async getAuth(): Promise<UserWithId> {
        return this.user;
    }

    async signIn(email: string, password: string): Promise<UserWithId> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then((user) => {
                    // Get token
                    this.auth.currentUser.getIdToken(true).then((token) => {
                        localStorage.setItem('token', token);
                    });

                    const uid = user.user.uid;

                    this.http.get(`/api/users/${ uid }`).subscribe(
                        (res: any) => {
                            const { user, customToken } = res;

                            // Store token in local storage
                            localStorage.setItem('email', user.email);
                            localStorage.setItem('customToken', customToken);

                            // Set user
                            this.user = user;

                            resolve(this.user);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async signUp(user: UserWithPassword): Promise<UserWithId> {
        return new Promise((resolve, reject) => {
            this.http.post('/api/users', { user }).subscribe(
                async (user: UserWithId) => {
                    this.user = user;
                    resolve(user);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    signInWithToken(token: string): Promise<UserWithId> {
        return new Promise((resolve, reject) => {
            signInWithCustomToken(this.auth, token).then((userCredential) => {
                this.user = userCredential.user;
                resolve(this.user);
            }).catch(() => {
                reject();
            });
        });
    }


    signInWithPopup(type: string): Promise<UserWithId> {
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
            }

            // Sign in
            signInWithPopup(this.auth, provider)
                .then(async (result) => {
                    const user = result.user;
                    const uid = user.uid;

                    this.http.get(`/api/users/${ uid }`).subscribe(
                        (res: any) => {
                            const { token, userRecord } = res;

                            // Store token in local storage
                            localStorage.setItem('token', token);

                            // Set user
                            this.user = userRecord;
                            resolve(this.user);
                        },
                        (error) => {
                            reject(error);
                        }
                    );

                    resolve(this.user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    verifyEmail(user: UserWithId): Observable<FileResponse> {
        return this.http.post<FileResponse>('/api/users/verify-email', { user });
    }

    updateUser(user: UserWithId): Observable<UserWithId> {
        return this.http.put<UserWithId>(`/api/users/${ user.uid }`, { user });
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
                this.snackbar.displaySuccessMessage('An email has been sent to reset your password');
            })
            .catch((error: HttpErrorResponse) => {
                this.snackbar.displayErrorMessage(error.error.message);
            });
    }

    deleteUser(): Observable<string> {
        return this.http.delete<string>(`/api/users/${ this.user.uid }`);
    }

    async signOut(): Promise<void> {
        return this.auth.signOut();
    }


    getCustomErrorMessage(errorCode: string): string {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'Email address not found';
            case 'auth/invalid-email':
            case 'auth/wrong-password':
                return 'Invalid email address or password';
            case'auth/too-many-requests':
                return 'Too many requests. Please try again later';
            case 'auth/email-already-exists':
                return 'Email address already exists';
            case 'auth/invalid-display-name':
                return 'Invalid display name';
            default:
                return errorCode;
        }
    }
}

