import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { AlmacenComponent } from './almacen/almacen.component';
import { MovableAreaDirective } from './tienda/movable-area.directive';
import { MovableZonaDirective } from './tienda/movable-zona.directive';
import { HorizontalDirective } from './horizontal.directive';
import { ModuloComponent } from './modulo/modulo.component';
import { ModuloHComponent } from './modulo/modulo-h.component';
import { LinealComponent } from './lineal/lineal.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DraggableModule } from '../draggable/draggable.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NbSelectModule } from '@nebular/theme/components/select/select.module';
import { NbLayoutModule, NbSidebarModule, NbCardModule, NbListModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';


@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    DraggableModule,
    FormsModule,
    NbSelectModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbCheckboxModule,
    AppRoutingModule
  ],
  declarations: [
    AlmacenComponent,
    MovableAreaDirective,
    MovableZonaDirective,
    HorizontalDirective,
    ModuloComponent,
    ModuloHComponent,
    LinealComponent,
    TiendaComponent,
    MenuComponent
  ],
  exports: [
    AlmacenComponent,
    MovableAreaDirective,
    MovableZonaDirective,
    HorizontalDirective,
    TiendaComponent
  ]
})
export class EstructuraTiendaModule { }
