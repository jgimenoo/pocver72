import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { MapaTiendaService } from '../mapa-tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements  OnInit, AfterViewInit  {


  @ViewChildren('czona') elemZonas: QueryList<any>;

  constructor(private mapaService: MapaTiendaService) { }

  moduloV = [{id: 0, label: '', size: 0, horizontal: false, color: '#fff'}];
  moduloH = [{id: 0, label: '', size: 0, horizontal: true, color: '#fff'}];

  contadorModulo = 5;
  contadorLineal = 3;

  zonas = [];
  secciones = [];

  ngOnInit() {
   // Construir el mapa segun lo guardado en BD
   this.zonas = this.mapaService.obtenerZonasTienda();
   this.secciones = this.mapaService.obtenerSeccionesTienda();
  }

  obtenerPosicionLinealZona(idLineal, zona){
    for (let i = 0; i < zona.lineales.length; i++) {
      if (zona.lineales[i].id === idLineal) {
        return i;
      }
    }
    return -1;
  }

  cambiarDatosZonaLineal(lineal, idZona, idZonaNueva, pos) {
    const zonaOrigen = this.zonas[idZona - 1]; // Habria que buscar la zona por id
    const zonaNueva = this.zonas[idZonaNueva - 1]; // Habria que buscar la zona por id
    const linealesZonaActual = zonaOrigen.lineales;
    const posLineal = this.obtenerPosicionLinealZona(lineal.id, zonaOrigen);
    linealesZonaActual.splice(posLineal, 1);
    lineal.zona = {id: zonaNueva.id};
    zonaNueva.lineales.push(lineal);
  }

  cambiarDatosZonaAlmacen(almacen, idZona, idZonaNueva, pos) {
    const zonaOrigen = this.zonas[idZona - 1];
    const zonaNueva = this.zonas[idZonaNueva - 1]; // Habria que buscar la zona por id
    zonaOrigen.almacen = null;
    almacen.zona = {id: zonaNueva.id};
    zonaNueva.almacen = almacen;
    // TO DO: A ver si puedo cambiar la posicion por la ultima movida, que no me sale por ser posiciones relativas
  }

  ngAfterViewInit() {
  }

  copiarModuloAZona(horizontal: boolean, idZona: number, idSeccion: number) {
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
    zona.lineales[pos].inicio = true;
    zona.lineales[pos].zona = {
      id: zona.id
    };
    zona.lineales[pos].dd = {
      origen_x: 20,
      origen_y: 40,
      x: null,
      y: null
    };
    zona.lineales[pos].modulos = [];
    const newmodulo = [{
      id: this.contadorModulo,
      zona: zona.id,
      lineal: zona.lineales[pos].id,
      label: modulo[0].label,
      size: modulo[0].size,
      horizontal: modulo[0].horizontal,
      color: seccion.color}];
    transferArrayItem(newmodulo, zona.lineales[pos].modulos, 0, 0);
  }

  borrarLineal(idZona, idLineal) {
    console.log('Se borra lineal ' + idLineal + ' de zona ' + idZona);
    const posLineal = this.obtenerPosicionLinealZona(idLineal, this.zonas[idZona - 1]);
    console.log(posLineal);
    if(posLineal !== -1){
      this.zonas[idZona - 1].lineales.splice(posLineal, 1);
    } else {
      console.error('Borrar lineal: No se ha encontrado el lineal en la zona');
    }
  }

}
