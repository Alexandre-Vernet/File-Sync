import { Component, OnInit } from '@angular/core';
import { MediaWithId } from '../../../classes/media';
import { UserWithId } from '../../../classes/user';
import { MediaService } from '../../../services/media/media.service';

@Component({
    selector: 'app-list-medias',
    templateUrl: './list-medias.component.html',
    styleUrls: ['./list-medias.component.scss']
})
export class ListMediasComponent implements OnInit {
    medias: MediaWithId[] = [];
    user: UserWithId;

    constructor(
        private mediaService: MediaService
    ) {
    }

    ngOnInit(): void {
        this.getMedias().then((medias) => {
            this.medias = medias;
        }).catch((error) => {
            console.error(error);
        });
    }

    getMedias(): Promise<MediaWithId[]> {
        const uid = 'zpJzHuofXMRuVyTRpW2BM7FiQdB3';
        return this.mediaService.getFiles(uid);
    }
}
