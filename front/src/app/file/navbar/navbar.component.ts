import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../authentication/user';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    currentRoute: string;
    user: User;

    constructor(
        private auth: AuthenticationService,
    ) {
    }

    ngOnInit(): void {
        // Get current user
        this.getUser().then((user) => {
            this.user = user;
        });

        // Get current URI
        this.currentRoute = window.location.pathname;
    }

    getUser(): Promise<User> {
        return this.auth.getAuth();
    }

    highlightRoute(route: string): boolean {
        return this.currentRoute === route;
    }

    updateMenuClassActive(route: string) {
        this.currentRoute = route;
    }
}
