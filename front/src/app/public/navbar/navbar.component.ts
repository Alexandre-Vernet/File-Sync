import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../authentication/user';
import { Router } from '@angular/router';
import { FileService } from '../../file/file.service';
import { FileWithId } from '../../file/file';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user: User;
    totalFilesSize: number = 0;

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private fileService: FileService
    ) {
    }

    async ngOnInit(): Promise<void> {
        // Get current user
        this.user = await this.auth.getAuth();

        setTimeout(() => {
            this.fileService.filesSubject.subscribe((files) => {
                files.forEach((file: FileWithId) => {
                    // Get total size of files in GB and round to 3 decimals
                    this.totalFilesSize += file.size;
                    this.totalFilesSize = Math.round(this.totalFilesSize / (1024 * 1024 * 1024) * 1000) / 1000;
                });
            });
        }, 500);
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
