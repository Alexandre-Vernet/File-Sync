import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../classes/user';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword
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

    async signUp(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    const user = {
                        uid: userCredential.user.uid,
                        firstName: 'Ada',
                        lastName: 'Zdravkovic',
                        email: 'azdazdazdazd',
                        photoURL: 'adzadazdad',
                        dateCreation: new Date()
                    };

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

