import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDropUploadFileComponent } from './drag-drop-upload-file.component';

const routes: Routes = [
    { path: '', component: DragDropUploadFileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DragDropUploadFileRoutingModule {
}
