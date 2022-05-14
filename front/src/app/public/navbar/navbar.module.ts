import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        MatProgressBarModule,
        MatTooltipModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
