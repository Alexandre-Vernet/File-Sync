import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    DialogDeleteAccountComponent,
    UserProfileComponent,
    DialogDeleteFilesComponent
} from './user-profile/user-profile.component';
import { AuthenticationComponent } from './authentication.component';
import { NavbarModule } from '../public/navbar/navbar.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        UserProfileComponent,
        AuthenticationComponent,
        DialogDeleteAccountComponent,
        DialogDeleteFilesComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        NavbarModule,
        MatDialogModule,
    ]
})
export class AuthenticationModule {
}
