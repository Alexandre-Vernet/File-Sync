import { Component, OnInit } from '@angular/core';
import { MediaWithId } from '../media';
import { UserWithId } from '../../authentication/user';
import { MediaService } from '../media.service';
import * as moment from 'moment';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
    selector: 'app-list-medias',
    templateUrl: './list-medias.component.html',
    styleUrls: ['./list-medias.component.scss']
})
export class ListMediasComponent implements OnInit {
    medias: MediaWithId[] = [];
    user: UserWithId;

    constructor(
        private mediaService: MediaService,
        private auth: AuthenticationService
    ) {
    }

    async ngOnInit() {

        setTimeout(() => {

            // Get user
            this.auth.getAuth().then((user) => {
                this.user = user;

                // Get medias
                this.mediaService.getMedias(user.uid).then((medias) => {
                    this.medias = medias;
                }).catch((error) => {
                    console.error(error);
                });
            });
        }, 2000);
    }

    convertTypeMedia(type: string): string {
        // Get the type of media before the slash
        return type.split('/')[0];
    }

    convertDate(date: Date): string {
        return moment(date).startOf('minutes').fromNow();
    }

    deleteMedia(media: MediaWithId): void {
        this.mediaService.deleteMedia(media).then(() => {
            this.medias = this.medias.filter((m) => m.id !== media.id);
        }).catch((error) => {
            console.error(error);
        });
    }
}
