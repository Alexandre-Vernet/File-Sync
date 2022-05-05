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

    async ngOnInit(): Promise<void> {
        // Get current user
        this.user = await this.auth.getAuth();

        this.getCurrentRoute();
    }

    getUser(): Promise<User> {
        return this.auth.getAuth();
    }

    getCurrentRoute(): void {
        this.currentRoute = window.location.pathname;
    }

    highlightRoute(route: string): boolean {
        return this.currentRoute === route;
    }

    async navigateTo(route: string): Promise<void> {
        await this.router.navigate([route]);
        this.getCurrentRoute();
    }

    signOut() {
        this.auth.signOut().then(async () => {
            this.auth.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('customToken');
            await this.router.navigateByUrl('/authentication');
        });
    }
}
