import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
} from 'firebase/auth';
import { SnackbarService } from '../public/snackbar/snackbar.service';
import { BehaviorSubject, from, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    auth = getAuth();

    private userSubject = new BehaviorSubject<User>(null);
    user$ = this.userSubject.asObservable();

    authUri: string = environment.authUri();

    constructor(
        private readonly http: HttpClient,
        private readonly snackbar: SnackbarService
    ) {
    }

    signInWithEmail(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password))
            .pipe(
                switchMap(userCredential => this.getAccessToken(userCredential.user.uid))
            );
    }

    signUp(user: User) {
        return this.http.post<User>(`${ this.authUri }`, { user })
            .pipe(
                tap(user => this.getAccessToken(user.uid)),
                map((user) => this.userSubject.next(user)),
            );
    }

    signInWithPopup(type: 'google' | 'github') {
        let provider: GoogleAuthProvider | GithubAuthProvider;
        switch (type) {
            case'google':
                provider = new GoogleAuthProvider();
                break;
            case 'github':
                provider = new GithubAuthProvider();
                break;
        }


        return from(signInWithPopup(this.auth, provider))
            .pipe(
                switchMap(userCredential => this.getAccessToken(userCredential.user.uid))
            );
    }

    signInWithAccessToken(accessToken: string) {
        return this.http.post<User>(`${ this.authUri }/sign-in-with-access-token`, { accessToken })
            .pipe(tap(user => this.userSubject.next(user)));
    }

    getAccessToken(id: string) {
        return this.http.get(`${ this.authUri }/${ id }`)
            .pipe(
                tap((res: { accessToken: string }) => {
                    const { accessToken } = res;

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

    updateUser(user: User) {
        return this.http.put<User>(`${ this.authUri }/${ user.uid }`, { user });
    }

    updatePassword(newPassword: string) {
        return from(updatePassword(this.auth.currentUser, newPassword));
    }

    resetPassword(emailAddress: string) {
        return from(sendPasswordResetEmail(this.auth, emailAddress));
    }

    deleteUser() {
        return this.http.delete(`${ this.authUri }/${ this.userSubject.value.uid }`)
            .pipe(
                tap(() => this.signOut()),
            );
    }

    signOut() {
        return from(this.auth.signOut())
            .pipe(
                tap(() => {
                    this.userSubject.next(null);
                    localStorage.clear();
                })
            );
    }
}

