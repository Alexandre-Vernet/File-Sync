import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./file/file.module').then(m => m.FileModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'sign-in',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
        component: SignInComponent
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
        component: SignUpComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
