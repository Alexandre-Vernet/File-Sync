import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'authentication'
})
export class AuthenticationPipe implements PipeTransform {

    getCustomErrorMessage(errorCode: string): string {
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
                return 'An error occurred';
        }
    }

    transform(value: any, ...args: any[]): any {
    }

}
