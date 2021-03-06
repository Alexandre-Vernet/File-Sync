import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../authentication/user';
import { Router } from '@angular/router';
import { FileService } from '../../file/file.service';
import { File } from '../../file/file';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user: User;
    totalFilesSize: string = '0';
    progressBarValue: number = 0;

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private fileService: FileService
    ) {
    }

    async ngOnInit(): Promise<void> {
        // Get current user
        this.user = await this.auth.getAuth();

        this.fileService.filesSubject.subscribe((files) => {
            if (files) {
                const totalSize = File.getTotalSize(files);

                // Convert files size in percentage (5GB = 100%)
                this.progressBarValue = Math.round(totalSize / 5000000000 * 100);

                // Display total files size
                this.totalFilesSize = File.convertSize(totalSize);
            }
        });

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
