import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    signOut() {
        this.auth.signOut().then(async () => {
            await this.router.navigateByUrl('/');
        });
    }

    deleteAccount() {
        this.auth.deleteUser().then(() => {
            this.signOut();
        });
    }
}
