export interface User {
    email: string;
    displayName: string;
    photoURL: string;
}

export interface UserWithId extends User {
    uid: string;
}

export interface UserWithPassword extends User {
    password: string;
}