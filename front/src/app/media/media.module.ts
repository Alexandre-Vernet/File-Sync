import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { DialogUpdateMedia, ListMediasComponent } from './list-medias/list-medias.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchPipe } from './search.pipe';


@NgModule({
    declarations: [
        MediaComponent,
        ListMediasComponent,
        UploadMediaComponent,
        DialogUpdateMedia,
        SearchPipe
    ],
    imports: [
        CommonModule,
        MediaRoutingModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatCardModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class MediaModule {
}
