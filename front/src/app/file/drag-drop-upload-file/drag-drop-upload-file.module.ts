import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropUploadFileRoutingModule } from './drag-drop-upload-file-routing.module';
import { DragDropUploadFileComponent } from './drag-drop-upload-file.component';


@NgModule({
  declarations: [DragDropUploadFileComponent],
  imports: [
    CommonModule,
    DragDropUploadFileRoutingModule
  ]
})
export class DragDropUploadFileModule { }
