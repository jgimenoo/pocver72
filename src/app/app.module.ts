import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

    //Toastr
    import { NbToastrModule } from '@nebular/theme';

    // Smart Table
    import { Ng2SmartTableModule } from 'ng2-smart-table';

    //chart pie & chartbar
    import { ChartsModule } from 'ng2-charts';

//Components
import { MainComponent } from './main/main.component';
import { OutputWindowComponent } from './output-window/output-window.component';
import { ProductsComponent } from './products/products.component';
import { ShopsComponent } from './shops/shops.component';
import { DistritiendaComponent } from './distritienda/distritienda.component';
import { DistribucionComponent } from './distribucion/distribucion.component';
import { AreatiendaComponent } from './areatienda/areatienda.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BarPieComponent } from './bar-pie/bar-pie.component';
import { EstructuraTiendaModule } from './estructura-tienda/estructura-tienda.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';
    
import { InMemoryDataServiceService } from './in-memory-data-service.service';
import { EstructuraModuloModule } from './estructura-modulo/estructura-modulo.module';

    // Servicios
    import { OutputWindowService } from './services/output-window.service';
    import { ShopsserviceService } from './services/shopsservice.service';
    import { ProductsserviceService } from './services/productsservice.service';
    import { AreatiendaService } from './services/areatienda.service';
    import { DistribucionService } from './services/distribucion.service';
    import { DistritiendaService } from './services/distritienda.service';





@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OutputWindowComponent,
    ProductsComponent,
    ShopsComponent,
    DistritiendaComponent,
    DistribucionComponent,
    AreatiendaComponent,
    BarChartComponent,
    BarPieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    ChartsModule,
    EstructuraTiendaModule,
    EstructuraModuloModule,
    NbToastrModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    environment.production ? [] :
     HttpClientInMemoryWebApiModule.forRoot(InMemoryDataServiceService, { delay: 100 })  // Para emular base de datos
  ],
  providers: [
    OutputWindowService,
    ProductsserviceService,
    ShopsserviceService,
    AreatiendaService,
    DistribucionService,
    DistritiendaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
