import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private auth: AuthenticationService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.auth.getAuth().then(async () => {
            this.checkIfEmailIsVerified();
        }).catch(() => {
        });
    }


    checkIfEmailIsVerified() {
        this.auth.getAuth().then(async (user) => {
            if (user.emailVerified) {
                this.navigateToHome();
            } else {
                this.http.post<boolean>('/api/users/verify-email', { user }).subscribe(async () => {
                }, async (e) => {
                    console.error(e);
                });

            }
        }).catch(() => {

        });
    }

    async navigateToHome() {
        await this.router.navigateByUrl('/file');
    }
}
