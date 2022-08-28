import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { VerifyEmailGuard } from './authentication/verify-email.guard';

const routes: Routes = [
    {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.FileModule),
        canActivate: [AuthenticationGuard, VerifyEmailGuard]
    },
    {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'privacy',
        loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule)
    },
    {
        path: '**',
        redirectTo: 'file'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
