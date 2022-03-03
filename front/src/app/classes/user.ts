export class User {
    private _uid: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _profilePicture: string;
    private _dateCreated: Date;

    constructor(uid: string, firstName: string, lastName: string, email: string, profilePicture: string, dateCreated: Date) {
        this._uid = uid;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._profilePicture = profilePicture;
        this._dateCreated = dateCreated;
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

    get profilePicture(): string {
        return this._profilePicture;
    }

    set profilePicture(value: string) {
        this._profilePicture = value;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    set dateCreated(value: Date) {
        this._dateCreated = value;
    }
}
