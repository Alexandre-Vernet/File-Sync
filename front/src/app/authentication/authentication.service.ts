import { Injectable, Injector } from '@angular/core';
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
import { BehaviorSubject, from, map, switchMap, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileService } from '../file/file.service';

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
        private injector: Injector,
    ) {
    }

    signInWithEmail(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password))
            .pipe(
                take(1),
                switchMap(userCredential => this.getAccessToken(userCredential.user.uid))
            );
    }

    signUp(user: User) {
        return this.http.post<User>(`${ this.authUri }`, { user })
            .pipe(
                take(1),
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
                take(1),
                switchMap(userCredential => this.getAccessToken(userCredential.user.uid))
            );
    }

    signInWithAccessToken(accessToken: string) {
        return this.http.post<User>(`${ this.authUri }/sign-in-with-access-token`, { accessToken })
            .pipe(
                take(1),
                tap(user => this.userSubject.next(user))
            );
    }

    getAccessToken(id: string) {
        return this.http.get<string>(`${ this.authUri }/${ id }`)
            .pipe(
                take(1),
                tap((accessToken) => localStorage.setItem('accessToken', accessToken))
            );
    }

    updateUser(user: User) {
        return this.http.put<User>(`${ this.authUri }/${ user.uid }`, { user })
            .pipe(
                take(1),
                tap(user => this.userSubject.next(user))
            );
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
                take(1),
                switchMap(() => this.signOut()),
            );
    }

    signOut() {
        return from(this.auth.signOut())
            .pipe(
                take(1),
                tap(() => {
                    const fileService = this.injector.get(FileService);
                    fileService.resetFileSubject();
                    this.userSubject.next(null);
                    localStorage.clear();
                })
            );
    }

    getCustomErrorMessage(errorCode: string) {
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
            case 'auth/account-exists-with-different-credential':
                return 'Email address already exists with a different provider';
            default:
                return '';
        }
    }
}

