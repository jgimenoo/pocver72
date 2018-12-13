import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { OutputWindowComponent } from './output-window/output-window.component';
import {MainComponent} from './main/main.component';


const appRoutes: Routes = [{
    path: '', redirectTo: '/main', pathMatch: 'full'
}, {
    component: MainComponent, path: 'main'
}, {
  component: OutputWindowComponent, path: 'Output'
}, {
    path: '**', redirectTo: '/main', pathMatch: 'full'
}];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes, {
          enableTracing: true
        }, // <-- debugging purposes only
      ),
    ],
    exports: [
      RouterModule,
    ],
  })

export class AppRoutingModule {} // Export of the routing module.
