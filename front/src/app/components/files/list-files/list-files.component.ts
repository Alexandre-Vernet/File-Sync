import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../services/media/media.service';
import { UserWithId } from '../../../classes/user';
import { MediaWithId } from '../../../classes/media';

@Component({
    selector: 'app-list-files',
    templateUrl: './list-files.component.html',
    styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {

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
