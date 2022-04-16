import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { UserWithId } from './authentication/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    user: UserWithId;

    constructor(
        private auth: AuthenticationService
    ) {
    }

    async ngOnInit() {
        this.user = await this.auth.getAuth();
        console.log(this.user);
    }
}
