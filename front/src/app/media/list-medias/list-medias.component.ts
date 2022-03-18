import { Component, Inject, OnInit } from '@angular/core';
import { MediaWithId } from '../media';
import { UserWithId } from '../../authentication/user';
import { MediaService } from '../media.service';
import * as moment from 'moment';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

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
        private auth: AuthenticationService,
        public dialog: MatDialog,
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
                    this.mediaService.displayErrorMessage(error);
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

    openDialogUpdateMedia(media: MediaWithId) {
        this.dialog.open(DialogUpdateMedia, { data: media });
    }

    deleteMedia(media: MediaWithId): void {
        this.mediaService.deleteMedia(media).then(() => {
            this.medias = this.medias.filter((m) => m.id !== media.id);
        }).catch((error) => {
            this.mediaService.displayErrorMessage(error);
        });
    }
}

@Component({
    template: `
        <h1 mat-dialog-title>Update {{ media.name }}</h1>
        <div mat-dialog-content>
            <mat-form-field appearance="fill">
                <mat-label>Update message</mat-label>
                <input matInput placeholder="Hello World" [formControl]="formMessage" required>
                <mat-error *ngIf="formMessage.invalid">{{ getErrorMessage() }}</mat-error>
            </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="primary" (click)="updateMessage()" [disabled]="!formMessage.valid"
                    [mat-dialog-close]="true">
                Update
            </button>
        </div>
    `,
})
export class DialogUpdateMedia {

    formMessage = new FormControl(this.media.name, [Validators.required]);

    constructor(
        @Inject(MAT_DIALOG_DATA) public media: MediaWithId,
        private mediaService: MediaService,
    ) {
    }

    updateMessage() {
        this.media.name = this.formMessage.value;
        const mediaId = this.media.id;

        this.mediaService.updateMedia(this.media, mediaId).then(() => {
            // Reset form
            this.formMessage.setValue('');
            this.formMessage.setErrors(null);
        }).catch((error) => {
            this.displayErrorMessage(error);
        });
    }

    getErrorMessage() {
        if (this.formMessage.hasError('required')) {
            return 'You must enter a value';
        }

        return this.formMessage.hasError('empty') ? 'You must enter a value' : '';
    }


    displayErrorMessage(errorMessage: string) {
        this.mediaService.displayErrorMessage(errorMessage);
    }
}