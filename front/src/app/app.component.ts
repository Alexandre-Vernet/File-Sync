import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private titleService: Title) {
        !environment.production ? this.titleService.setTitle(environment.APP_NAME) : this.titleService.setTitle(environment.APP_NAME);
    }
}
