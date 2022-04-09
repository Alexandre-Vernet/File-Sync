import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    currentRoute: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    updateMenuClassActive(route: string) {
        this.currentRoute = route;
    }

}
