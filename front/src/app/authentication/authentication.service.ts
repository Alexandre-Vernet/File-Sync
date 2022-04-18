import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, UserWithId, UserWithPassword } from './user';
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signInWithCustomToken,
} from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    auth = getAuth();
    user: UserWithId;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
    }

    async getAuth(): Promise<UserWithId> {
        return this.user;
    }

    async signIn(email: string, password: string): Promise<UserWithId> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then((user) => {
                    const uid = user.user.uid;

                    this.http.get(`/api/users/${ uid }`).subscribe(
                        (res: any) => {
                            const { token, userRecord } = res;

                            // Store token in local storage
                            localStorage.setItem('token', token);
                            localStorage.setItem('email', userRecord.email);

                            // Set user
                            this.user = userRecord;

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

    async updateUser(user: UserWithId): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.put(`/api/users/${ user.uid }`, { user }).subscribe(
                (user: UserWithId) => {
                    this.user = user;
                    this.displaySuccessMessage('Your profile has been updated');
                    resolve(user);
                },
                (error: HttpErrorResponse) => {
                    this.displayErrorMessage(error.error.message);
                    reject(error);
                }
            );
        });
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
                            this.displayErrorMessage(error);
                        });
                }).catch((error) => {
                reject(error);
            });
        });
    }

    resetPassword(emailAddress: string): void {
        sendPasswordResetEmail(this.auth, emailAddress)
            .then(() => {
                this.displaySuccessMessage('An email has been sent to reset your password');
            })
            .catch((error: HttpErrorResponse) => {
                this.displayErrorMessage(error);
            });
    }

    async deleteUser(): Promise<void> {
        const user = await this.getAuth();
        this.http.delete(`/api/users/${ user.uid }`).subscribe(
            () => {
                this.router.navigateByUrl('/authentication');
                this.displaySuccessMessage('Your account has been deleted');
            },
            (error) => {
                this.displayErrorMessage(error);
            }
        );
    }

    async signOut(): Promise<void> {
        this.auth.signOut()
            .then(async () => {
                this.user = null;
                localStorage.clear();
                await this.router.navigateByUrl('/authentication');
            })
            .catch((error) => {
                this.displayErrorMessage(error);
            });
    }


    displaySuccessMessage(message: string) {
        this.snackBar.open(message, '', {
            duration: 2000,
            panelClass: ['success-snackbar']
        });
    }

    displayErrorMessage(error: HttpErrorResponse) {
        this.snackBar.open(error.message, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 4000,
        });
    }

    async customErrorMessage(errorCode: string): Promise<string> {
        return new Promise((resolve) => {
            switch (errorCode) {
                case 'auth/user-not-found':
                    resolve('Email address not found');
                    break;
                case 'auth/invalid-email':
                case 'auth/wrong-password':
                    resolve('Invalid email address or password');
                    break;
                case'auth/too-many-requests':
                    resolve('Too many requests. Please try again later');
                    break;
                case 'auth/email-already-exists':
                    resolve('Email address already exists');
                    break;
                case 'auth/invalid-display-name':
                    resolve('Invalid display name');
                    break;
                default:
                    resolve(errorCode);
            }
        });
    }
}

