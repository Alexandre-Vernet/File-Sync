import { Component, OnInit } from '@angular/core';
import { MediaResponse, MediaWithId } from '../media';
import { UserWithId } from '../../authentication/user';
import { MediaService } from '../media.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import * as moment from 'moment';
import { DialogUpdateMedia } from '../list-medias/list-medias.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-tabs-medias',
    templateUrl: './tabs-medias.component.html',
    styleUrls: ['./tabs-medias.component.scss']
})
export class TabsMediasComponent implements OnInit {

    medias: MediaWithId[] = [];
    user: UserWithId;

    constructor(
        private mediaService: MediaService,
        private auth: AuthenticationService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        setTimeout(() => {

            // Get user
            this.auth.getAuth().then((user) => {
                this.user = user;

                // Get medias
                this.mediaService.getMedias(user.uid).then((medias) => {
                    this.medias = medias;
                }).catch((error: MediaResponse) => {
                    this.mediaService.displayErrorMessage(error);
                });
            });
        }, 2000);
    }

    hasMedia(type: string): boolean {
        type = this.castTypeMedia(type);
        // Find in medias if this type exists
        const media = this.medias.find((media) => this.castTypeMedia(media.type) === type);
        return !!media;
    }

    openDialogUpdateMedia(media: MediaWithId) {
        this.dialog.open(DialogUpdateMedia, { data: media });
    }

    castTypeMedia(type: string): string {
        // Get the type of media before the slash (text/plain -> text)
        return type.split('/')[0];
    }

    convertDate(date: Date): string {
        return moment(date).startOf('minutes').fromNow();
    }


    deleteMedia(media: MediaWithId): void {
        this.mediaService.deleteMedia(media).then(() => {
            this.medias = this.medias.filter((m) => m.id !== media.id);
        }).catch((error: MediaResponse) => {
            this.mediaService.displayErrorMessage(error);
        });
    }
}
