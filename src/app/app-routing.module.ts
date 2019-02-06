import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { OutputWindowComponent } from './output-window/output-window.component';
import {MainComponent} from './main/main.component';
import { TiendaComponent } from './estructura-tienda/tienda/tienda.component';
import { DetalleModuloComponent } from './estructura-modulo/detalle-modulo/detalle-modulo.component';


const appRoutes: Routes = [{
    path: '', redirectTo: '/main', pathMatch: 'full'
}, {
  component: MainComponent, path: 'main'
}, {
  component: TiendaComponent, path: 'estructuratienda'
}, {
  component: OutputWindowComponent, path: 'Output'
}, {
  component: DetalleModuloComponent, path: 'modulo/:idLineal/:idModulo/:refrigerado'
}, {
    path: '**', redirectTo: '/main', pathMatch: 'full'
}];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes, {
          enableTracing: false
        }, // <-- debugging purposes only
      ),
    ],
    exports: [
      RouterModule,
    ],
  })

export class AppRoutingModule {} // Export of the routing module.
