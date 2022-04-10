import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../authentication/user';
import { Router } from '@angular/router';


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
        private router: Router
    ) {
    }

    ngOnInit(): void {
        // Get current user
        this.getUser().then((user) => {
            this.user = user;
        });

        // Get current route
        const route = this.router.url;
        this.currentRoute = route.split('/')[1];    /* '/home' => 'home' */
    }

    highlightRoute(route: string): boolean {
        return this.currentRoute === route;
    }

    getUser(): Promise<User> {
        return this.auth.getAuth();
    }

    updateMenuClassActive(route: string) {
        this.currentRoute = route;
    }
}
