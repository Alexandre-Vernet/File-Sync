import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
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
