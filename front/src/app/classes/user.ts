export interface User {
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
}

export interface UserWithId extends User {
    uid: string;
}