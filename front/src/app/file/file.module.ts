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
import { FilePipe } from './file.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListFilesComponent } from './list-files/list-files.component';
import { TabsFilesComponent } from './tabs-files/tabs-files.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DragDropUploadFileComponent } from './drag-drop-upload-file/drag-drop-upload-file.component';
import { NavbarModule } from '../public/navbar/navbar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileCardComponent } from './file-card/file-card.component';
import { NotesComponent } from './notes/notes.component';
import { StorageUsageComponent } from './storage-usage/storage-usage.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NuMarkdownModule } from '@ng-util/markdown';
import { DialogUpdateFileNameComponent } from './dialog-update-file-name/dialog-update-file-name.component';
import { DialogDeleteAllFilesComponent } from './dialog-delete-all-files/dialog-delete-all-files.component';


@NgModule({
    declarations: [
        FileComponent,
        ListFilesComponent,
        UploadFileComponent,
        FilePipe,
        TabsFilesComponent,
        DragDropUploadFileComponent,
        UploadFileComponent,
        LoaderComponent,
        FileCardComponent,
        NotesComponent,
        StorageUsageComponent,
        DialogUpdateFileNameComponent,
        DialogDeleteAllFilesComponent,
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
        NgxDropzoneModule,
        NavbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        PdfViewerModule,
        NuMarkdownModule,
    ],
    exports: [
        FileComponent
    ],
})
export class FileModule {
}
