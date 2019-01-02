import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleModuloComponent } from './detalle-modulo/detalle-modulo.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { NbLayoutModule, NbCardModule, NbSidebarModule } from '@nebular/theme';
import { ProductoVisualComponent } from './producto-visual/producto-visual.component';
import { MenuModuloComponent } from './menu-modulo/menu-modulo.component';
import { DraggableModule } from '../draggable/draggable.module';
import { GrupoProductosComponent } from './grupo-productos/grupo-productos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbSidebarModule,
    DraggableModule
  ],
  declarations: [
    DetalleModuloComponent,
    ProductoVisualComponent,
    MenuModuloComponent,
    GrupoProductosComponent],
  exports: [
    DetalleModuloComponent
  ]
})
export class EstructuraModuloModule { }
