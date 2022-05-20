import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationGuard } from './authentication.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {
                path: '',
                component: SignInComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: 'profile',
                component: UserProfileComponent,
                canActivate: [AuthenticationGuard]
            },
            {
                path: 'verify-email',
                component: VerifyEmailComponent,
            },
            {
                path: '**',
                redirectTo: '',
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
