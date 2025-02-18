import { Routes } from '@angular/router';
import { FileComponent } from './app/file/file.component';
import { authenticationGuard } from './app/authentication/authentication.guard';
import { UploadFileComponent } from './app/file/upload-file/upload-file.component';
import { TabsFilesComponent } from './app/file/tabs-files/tabs-files.component';
import { ListFilesComponent } from './app/file/list-files/list-files.component';
import { StorageUsageComponent } from './app/file/storage-usage/storage-usage.component';
import { AuthenticationComponent } from './app/authentication/authentication.component';
import { SignInComponent } from './app/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './app/authentication/sign-up/sign-up.component';
import { UserProfileComponent } from './app/authentication/user-profile/user-profile.component';
import { PrivacyComponent } from './app/privacy/privacy.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'file',
        pathMatch: 'full',
    },
    {
        path: 'file',
        component: FileComponent,
        canActivate: [authenticationGuard],
        children: [
            {
                path: 'upload-file',
                component: UploadFileComponent,
            },
            {
                path: 'tabs',
                component: TabsFilesComponent,
            },
            {
                path: 'list-files',
                component: ListFilesComponent,
            },
            {
                path: 'storage-usage',
                component: StorageUsageComponent,
            },
            {
                path: '**',
                redirectTo: 'list-files',
            },
        ],
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {
                path: '',
                component: SignInComponent,
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
            },
            {
                path: 'profile',
                component: UserProfileComponent,
                canActivate: [authenticationGuard],
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
    {
        path: 'privacy',
        component: PrivacyComponent
    },
    {
        path: '**',
        component: ListFilesComponent
    }
];
