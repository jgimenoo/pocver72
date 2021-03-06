import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Renderer2, ViewChild, OnChanges, SimpleChanges, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { MapaTiendaService } from '../mapa-tienda.service';
import { MovableAreaDirective } from './movable-area.directive';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MovableZonaDirective } from './movable-zona.directive';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements  OnInit, AfterViewInit   {


  @ViewChildren('czona') elemZonas: QueryList<MovableZonaDirective>;
  @ViewChild('ctienda') elemTienda: MovableAreaDirective;

  constructor(
    private mapaService: MapaTiendaService,
    private device: DeviceDetectorService,
    private cd: ChangeDetectorRef) {}

  moduloV = [{id: 0, label: '', size: this.device.isDesktop() ? 1 : 0, horizontal: false, color: '#fff', ancho: false}];
  moduloH = [{id: 0, label: '', size: this.device.isDesktop() ? 1 : 0, horizontal: true, color: '#fff', ancho: false}];

  contadorModulo = 19;
  contadorLineal = 3;

  idTienda = 1;  // Este dato se pasa por parametro
  zonas = [];
  secciones = [];
  posicionRevisada = false;

  ngOnInit() {
   // Construir el mapa segun lo guardado en BD
   // this.zonas = this.mapaService.obtenerZonasTienda();
   this.mapaService.obtenerZonasTienda(this.idTienda).subscribe(data => {
    this.idTienda = data.idTienda;
    this.zonas = data.zonas;
    this.secciones = data.secciones;
  });

  }

  obtenerPosicionLinealZona(idLineal, zona) {
    for (let i = 0; i < zona.lineales.length; i++) {
      if (zona.lineales[i].id === idLineal) {
        return i;
      }
    }
    return -1;
  }

  cambiarDatosZonaLineal(lineal, idZonaOrigen, idZonaNueva, pos) {
    const zonaOrigen = this.zonas[idZonaOrigen - 1]; // Habria que buscar la zona por id
    const zonaNueva = this.zonas[idZonaNueva - 1]; // Habria que buscar la zona por id
    const linealesZonaActual = zonaOrigen.lineales;
    const posLineal = this.obtenerPosicionLinealZona(lineal.id, zonaOrigen);
    linealesZonaActual.splice(posLineal, 1);
    lineal.zona = {id: zonaNueva.id};
    lineal.modulos.forEach(modulo => {
      modulo.zona = zonaNueva.id;
    });
    zonaNueva.lineales.push(lineal);
  }

  cambiarDatosZonaAlmacen(almacen, idZonaOrigen, idZonaNueva, pos) {
    const zonaOrigen = this.zonas[idZonaOrigen - 1];
    const zonaNueva = this.zonas[idZonaNueva - 1]; // Habria que buscar la zona por id
    zonaOrigen.almacen = null;
    almacen.zona = {id: zonaNueva.id};
    zonaNueva.almacen = almacen;
    this.mapaService.obtenerDistanciasAlmacen(this.zonas, zonaNueva);
  }

  convertToMap(elemsMapa) {
    const vector = [];
    elemsMapa.forEach(element => {
      vector[element.id] = element;
    });
    return vector;
  }

   revisarPosicionLineales() {
    if ( (!this.device.isDesktop() && this.elemZonas.first && this.elemZonas.first.datos.saved_desktop)
    || (this.device.isDesktop() && this.elemZonas.first && !this.elemZonas.first.datos.saved_desktop)) {
      console.log('cambiando posiciones');
      this.elemZonas.toArray().forEach(eZona => {
        const vZonas = this.convertToMap(this.zonas);
        const limitesZona = eZona.element.nativeElement.getBoundingClientRect();
        vZonas[eZona.datos.id].lineales.forEach(lineal => {
         lineal.dd.origen_x = Math.round(( limitesZona.width * lineal.dd.origen_x ) / vZonas[eZona.datos.id].saved_width );
         lineal.dd.origen_y = Math.round(( limitesZona.height * lineal.dd.origen_y ) / vZonas[eZona.datos.id].saved_height);
        });
        if (vZonas[eZona.datos.id].almacen) {
          const almacen = vZonas[eZona.datos.id].almacen;
          almacen.dd.origen_x = Math.round(( limitesZona.width * almacen.dd.origen_x ) / vZonas[eZona.datos.id].saved_width ) - 20;
          almacen.dd.origen_y = Math.round(( limitesZona.height * almacen.dd.origen_y ) / vZonas[eZona.datos.id].saved_height) - 10;
        }
     });
     this.posicionRevisada = true;
   }
   }

  ngAfterViewInit() {
    // Hay que seleccionar los combos
    this.elemZonas.changes.subscribe(() => {
      if (!this.posicionRevisada) {
        this.revisarPosicionLineales();
      }
      this.cd.detectChanges();
    });
    this.elemZonas.notifyOnChanges();
  }

  copiarModuloAZona(horizontal: boolean, idZona: number, idSeccion: number, refrigerado: boolean) {
    // Se crea un lineal de un modulo
    const zona = this.zonas[idZona - 1];
    const seccion = this.secciones[idSeccion - 1];
    zona.lineales.push([]);
    const pos = zona.lineales.length - 1;
    this.contadorLineal++;
    this.contadorModulo++;
    zona.lineales[pos].id = this.contadorLineal;
    zona.lineales[pos].horizontal = horizontal;
    const modulo = ( horizontal ? this.moduloH : this.moduloV );
    zona.lineales[pos].size = modulo[0].size;
    zona.lineales[pos].refrigerado = refrigerado;
    zona.lineales[pos].zona = {
      id: zona.id
    };
    zona.lineales[pos].dd = {
      origen_x: 20,
      origen_y: 40
    };
    zona.lineales[pos].modulos = [];
    const newmodulo = [{
      id: this.contadorModulo,
      zona: zona.id,
      lineal: zona.lineales[pos].id,
      label: modulo[0].label,
      size: modulo[0].size,
      horizontal: modulo[0].horizontal,
      seccion: seccion.id,
      color: seccion.color}];
    transferArrayItem(newmodulo, zona.lineales[pos].modulos, 0, 0);
  }

  borrarLineal(idZona, idLineal) {
    console.log('Se borra lineal ' + idLineal + ' de zona ' + idZona);
    const posLineal = this.obtenerPosicionLinealZona(idLineal, this.zonas[idZona - 1]);
    if (posLineal !== -1) {
      this.zonas[idZona - 1].lineales.splice(posLineal, 1);
    } else {
      console.error('Borrar lineal: No se ha encontrado el lineal en la zona');
    }
  }

  revisarSiBorrarModulo(event: any) {
    const posTienda = this.elemTienda.element.nativeElement.getBoundingClientRect();
    const posModulo = event.moduloData.dd;
    if (posModulo.y < posTienda.top || posModulo.y > posTienda.bottom || posModulo.x < posTienda.left || posModulo.x > posTienda.right) {
      console.log('sobrepasados limites de tienda, se borra el modulo');
      event.modulosLineal.splice(event.posLineal, 1);
      if (event.modulosLineal.length === 0) {
        this.borrarLineal(event.moduloData.zona, event.moduloData.lineal);
      }
    }
  }

  guardarZonas() {
    // TO DO : Antes de llamar al servicio hay que guardar las nuevas posiciones de inicio
    this.mapaService.guardarMapaTienda(this.idTienda, this.zonas, this.secciones).subscribe(data => {
     console.log('Guardado mapa lineales de tienda');  // Revisar este put
    });
  }

}
