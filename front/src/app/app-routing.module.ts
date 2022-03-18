import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
    { path: '',  loadChildren: () => import('./media/media.module').then(m => m.MediaModule), canActivate: [AuthenticationGuard] },
    { path: 'sign-in',loadChildren: () => import('./authentication/sign-in/sign-in.module').then(m => m.SignInModule), component: SignInComponent },
    { path: 'sign-up',loadChildren: () => import('./authentication/sign-up/sign-up.module').then(m => m.SignUpModule), component: SignUpComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
