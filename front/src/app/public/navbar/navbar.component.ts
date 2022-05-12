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

    user: User;

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    async ngOnInit(): Promise<void> {
        // Get current user
        this.user = await this.auth.getAuth();
    }

    getUser(): Promise<User> {
        return this.auth.getAuth();
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
