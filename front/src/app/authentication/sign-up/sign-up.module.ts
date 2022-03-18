import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        SignUpRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SignUpModule {
}
