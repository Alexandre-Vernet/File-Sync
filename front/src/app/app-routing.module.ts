import { RouterModule } from '@angular/router';
import { routes } from '../route';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
