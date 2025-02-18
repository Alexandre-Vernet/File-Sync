import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../public/navbar/navbar.component';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
    imports: [RouterOutlet, NavbarComponent],
    standalone: true
})
export class FileComponent {

    constructor() {
    }
}
