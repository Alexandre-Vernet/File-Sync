import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserWithId, UserWithPassword } from './user';
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signInWithCustomToken
} from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    auth = getAuth();
    user: UserWithId;

    constructor(
        private http: HttpClient
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
                (user: UserWithId) => {
                    this.user = user;
                    resolve(user);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    signInWithToken(token: string) {
        signInWithCustomToken(this.auth, token).then((userCredential) => {
            console.log(userCredential.user);
            this.user = userCredential.user;
        }).catch((error) => {
            console.error(error);
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

                    const { uid, displayName, email, photoURL } = user;
                    this.user = {
                        uid,
                        displayName,
                        email,
                        photoURL
                    };

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
                    resolve(user);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    updatePassword(newPassword: string): Promise<void> {
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

    async resetPassword(emailAddress: string): Promise<void> {
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

    async deleteUser(user: UserWithId): Promise<void> {
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

    async signOut(): Promise<void> {
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
