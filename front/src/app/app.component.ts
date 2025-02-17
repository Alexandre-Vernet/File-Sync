import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    constructor(
        private readonly swUpdate: SwUpdate
    ) {
        if (environment.production) {
            this.swUpdate.checkForUpdate();
            if (this.swUpdate.isEnabled) {
                this.swUpdate.versionUpdates
                    .pipe(take(1))
                    .subscribe(event => {
                        if (event.type === 'VERSION_READY') {
                            window.location.reload();
                        }
                    });
            }
        }
    }
}
