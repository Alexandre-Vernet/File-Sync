import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogUpdateFileComponent, ListFilesComponent } from './list-files/list-files.component';
import { TabsFilesComponent } from './tabs-files/tabs-files.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DragDropUploadFileComponent } from './drag-drop-upload-file/drag-drop-upload-file.component';


@NgModule({
    declarations: [
        FileComponent,
        ListFilesComponent,
        UploadFileComponent,
        DialogUpdateFileComponent,
        SearchPipe,
        TabsFilesComponent,
        DragDropUploadFileComponent
    ],
    imports: [
        CommonModule,
        FileRoutingModule,
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
        MatChipsModule,
        MatToolbarModule,
        NgxDropzoneModule
    ],
})
export class FileModule {
}
