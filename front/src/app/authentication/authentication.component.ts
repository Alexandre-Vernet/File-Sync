import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    imports: [
        RouterOutlet
    ],
    standalone: true
})
export class AuthenticationComponent {

    constructor() {
    }
}
