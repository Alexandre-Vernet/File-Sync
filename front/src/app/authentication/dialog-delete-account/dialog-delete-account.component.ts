import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-delete-account',
    templateUrl: './dialog-delete-account.component.html',
    styleUrls: ['./dialog-delete-account.component.scss']
})
export class DialogDeleteAccountComponent {

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) {
    }

    confirmDelete() {
        this.auth.deleteUser().subscribe(() => {
            this.auth.signOut().then(async () => {
                this.auth.user = null;
                localStorage.clear();
                await this.router.navigateByUrl('/');
            });
        });
    }

}
