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
import { map, Observable, of, tap } from 'rxjs';
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

    getUser() {
        return this.user;
    }

    async signInWithEmail(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    // Get token
                    const uid = userCredential.user.uid;
                    this.getAccessToken(uid)
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
        return this.http.post<UserWithId>(`${this.authUri}`, {user})
            .pipe(
                map((res: UserWithId) => {
                    this.user = res;
                })
            );
    }

    signInWithPopup(type: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // Get provider
            let provider: GoogleAuthProvider | GithubAuthProvider;
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
                    this.getAccessToken(uid)
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

    signInWithAccessToken(accessToken: string): Observable<UserWithId> {
        return this.http.post<UserWithId>(`${this.authUri}/sign-in-with-access-token`, {accessToken})
            .pipe(
                tap({
                    next: (user: UserWithId) => this.user = user
                }),
                catchError(async () => {
                        this.snackbar.displayErrorMessage('Your session has expired. Please sign in again');
                        await this.router.navigateByUrl('/');
                        return null;
                    }
                ));
    }

    getAccessToken(uid: string): Observable<{ accessToken: string }> {
        return this.http.get(`${this.authUri}/${uid}`)
            .pipe(
                tap((res: { accessToken: string }) => {
                    const {accessToken} = res;

                    // Store tokens in local storage
                    localStorage.setItem('accessToken', accessToken);
                }),
                catchError((err) => {
                        this.snackbar.displayErrorMessage(err.error.message);
                        return of(null);
                    }
                )
            );
    }

    updateUser(user: UserWithId): Observable<UserWithId> {
        return this.http.put<UserWithId>(`${this.authUri}/${user.uid}`, {user});
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
                })
                .catch((error) => {
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
        return this.http.delete<string>(`${this.authUri}/${this.user.uid}`);
    }

    async signOut(): Promise<void> {
        return this.auth.signOut();
    }
}

