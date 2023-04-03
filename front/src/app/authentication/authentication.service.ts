import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { EMPTY, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

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
                    this.getAccessAndRefreshToken(uid)
                        .subscribe({
                            next: () => resolve(),
                            error: (error) => reject(error)
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    signUp(user: UserWithPassword): Observable<void> {
        return this.http.post<UserWithId>(`${ this.authUri }`, { user })
            .pipe(
                map((res: UserWithId) => {
                    this.user = res;
                })
            );
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
                    this.getAccessAndRefreshToken(uid)
                        .subscribe({
                            next: () => resolve(),
                            error: (error) => reject(error)
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    signInWithToken(accessToken: string): Observable<UserWithId> {
        return this.http.post<UserWithId>(`${ this.authUri }/sign-in-with-access-token`, { accessToken })
            .pipe(
                catchError(err => {
                    this.snackbar.displayErrorMessage(err.error.message);
                    return EMPTY;
                }),
                tap({
                        next: (user: UserWithId) => {
                            this.user = user;
                        },
                        error: () => {
                            this.getAccessTokenFromRefreshToken()
                                .subscribe({
                                    next: (accessToken) => {
                                        this.signInWithToken(accessToken)
                                            .subscribe({
                                                next: (user) => {
                                                    this.user = user;
                                                    return user;
                                                },
                                                error: async () => {
                                                    this.snackbar.displayErrorMessage('Your session has expired. Please sign in again');
                                                    await this.router.navigateByUrl('/');
                                                    return null;
                                                }
                                            });
                                    },
                                    error: async () => {
                                        this.snackbar.displayErrorMessage('Your session has expired. Please sign in again');
                                        await this.router.navigateByUrl('/');
                                        return null;
                                    }
                                });
                        }
                    }
                ));
    }

    getAccessAndRefreshToken(uid: string): Observable<{ accessToken: string, refreshToken: string }> {
        return this.http.get(`${ this.authUri }/${ uid }`)
            .pipe(
                tap({
                        next: (res: { accessToken: string, refreshToken: string }) => {
                            const { accessToken, refreshToken } = res;

                            // Store tokens in local storage
                            localStorage.setItem('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken);
                        },
                        error: (err) => {
                            this.snackbar.displayErrorMessage(err.error.message);
                        }
                    }
                )
            );
    }

    getAccessTokenFromRefreshToken(): Observable<string> {
        const refreshToken = localStorage.getItem('refreshToken');
        return this.http.post<{ accessToken: string }>(`${ this.authUri }/refresh-token`, { refreshToken })
            .pipe(
                map(response => {
                    const accessToken = response.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    return accessToken;
                }),
                catchError(() => {
                    this.snackbar.displayErrorMessage('Your session has expired. Please sign in again.');
                    this.router.navigateByUrl('/');
                    localStorage.clear();
                    return of(null);
                })
            );
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
                        .catch((err) => {
                            this.snackbar.displayErrorMessage(err.error.message);
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
            .catch((err) => {
                this.snackbar.displayErrorMessage(err.error.message);
            });
    }

    deleteUser(): Observable<string> {
        return this.http.delete<string>(`${ this.authUri }/${ this.user.uid }`);
    }

    async signOut(): Promise<void> {
        return this.auth.signOut();
    }
}

