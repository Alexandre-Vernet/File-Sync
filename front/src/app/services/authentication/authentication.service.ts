import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../classes/user';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth';

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

    async signIn(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then((user) => {
                    const uid = user.user.uid;

                    this.http.get(`/api/users/${ uid }`).subscribe(
                        (user: User) => {
                            this.user = user;
                            resolve(user);
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

    async signUp(user: User, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth, user.email, password)
                .then(() => {
                    this.http.post('/api/users', { user }).subscribe(
                        (user: User) => {
                            this.user = user;
                            resolve(user);
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

    signInWithPopup(type: string) {
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

                    // Get data from account
                    const firstName = result.user?.displayName?.split(' ')[0];
                    const lastName = result.user?.displayName?.split(' ')[1];
                    const email = result.user?.email;
                    const profilePicture = result.user?.photoURL;

                    // Set users data
                    this.user = new User(
                        user.uid,
                        firstName,
                        lastName,
                        email,
                        profilePicture,
                        new Date(),
                    );

                    resolve(this.user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async updateUser(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.put(`/api/users/${ user.uid }`, { user }).subscribe(
                (user: User) => {
                    this.user = user;
                    resolve(user);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    updatePassword(newPassword: string) {
        return new Promise((resolve, reject) => {
            const user = this.auth.currentUser;

            updatePassword(user, newPassword)
                .then(() => {
                    resolve(null);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async resetPassword(emailAddress: string) {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(this.auth, emailAddress)
                .then(() => {
                    resolve(null);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    async deleteUser(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.delete(`/api/users/${ user.uid }`).subscribe(
                () => {
                    this.user = null;
                    resolve(null);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async signOut() {
        return new Promise((resolve, reject) => {
            this.auth.signOut()
                .then(() => {
                    this.user = null;
                    resolve(null);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

