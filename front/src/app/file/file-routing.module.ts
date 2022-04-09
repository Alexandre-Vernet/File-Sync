import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TabsFilesComponent } from './tabs-files/tabs-files.component';
import { ListFilesComponent } from './list-files/list-files.component';

const routes: Routes = [
    {
        path: '',
        component: FileComponent,
        children: [
            {
                path: '',
                component: ListFilesComponent,
            },
            {
                path: 'upload-file',
                component: UploadFileComponent,
            },
            {
                path: 'tabs',
                component: TabsFilesComponent,
            },
            {
                path: 'list-files',
                component: ListFilesComponent,
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FileRoutingModule {
}
