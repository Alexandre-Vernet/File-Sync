import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'file',
        pathMatch: "full"
    },
    {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.FileModule),
        canActivate: [AuthenticationGuard]
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
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
