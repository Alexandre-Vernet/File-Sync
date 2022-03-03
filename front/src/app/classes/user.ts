export class User {
    private _uid: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _photoURL: string;
    private _dateCreation: Date;

    constructor(uid: string, firstName: string, lastName: string, email: string, photoURL: string, dateCreation: Date) {
        this._uid = uid;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._photoURL = photoURL;
        this._dateCreation = dateCreation;
    }

    get uid(): string {
        return this._uid;
    }

    set uid(value: string) {
        this._uid = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get photoURL(): string {
        return this._photoURL;
    }

    set photoURL(value: string) {
        this._photoURL = value;
    }

    get dateCreation(): Date {
        return this._dateCreation;
    }

    set dateCreation(value: Date) {
        this._dateCreation = value;
    }
}
