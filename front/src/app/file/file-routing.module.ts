import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TabsFilesComponent } from './tabs-files/tabs-files.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { StorageUsageComponent } from './storage-usage/storage-usage.component';

const routes: Routes = [
    {
        path: '',
        component: FileComponent,
        children: [
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
            },
            {
                path: 'storage-usage',
                component: StorageUsageComponent,
            },
            {
                path: '**',
                redirectTo: 'list-files',
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FileRoutingModule {
}
