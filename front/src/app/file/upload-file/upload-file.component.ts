import { Component } from '@angular/core';
import { NotesComponent } from '../notes/notes.component';
import { DragDropUploadFileComponent } from '../drag-drop-upload-file/drag-drop-upload-file.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss'],
    imports: [
        NotesComponent,
        DragDropUploadFileComponent,
        LoaderComponent
    ],
    standalone: true
})
export class UploadFileComponent {
    constructor() {
    }
}
