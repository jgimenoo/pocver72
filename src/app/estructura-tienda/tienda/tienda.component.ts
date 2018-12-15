import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements  OnInit, AfterViewInit  {


  @ViewChildren('czona') elemZonas: QueryList<any>;

  constructor(private renderer: Renderer2) { }

  title = 'Logistica';
  actualizarVista = true;
  moduloV = [{id: 0, label: '', size: 0, horizontal: false, color: '#D0FBCA'}];
  moduloH = [{id: 0, label: '', size: 0, horizontal: true, color: '#C6C6FF'}];
  contadorModulo = 0;
  contadorLineal = 0;
  area = {
    top: 70,
    left: 210
  };
  zonas = [{
    id: 1,
    width: 600,
    height: 300,
    distancia: '',
    almacen: null,
    lineales: []
  }, {
    id: 2,
    width: 600,
    height: 300,
    distancia: '',
    almacen: null,
    lineales: []
  }, {
    id: 3,
    width: 600,
    height: 300,
    distancia: '',
    almacen: null,
    lineales: []
  }, {
    id: 4,
    width: 600,
    height: 300,
    distancia: '',
    almacen: null,
    lineales: []
  }];

  ngOnInit() {
   // Construir el mapa segun lo guardado en BD
   this.zonas = [{
    id: 1,
    width: 600,
    height: 300,
    distancia: 'Media',
    almacen: null,
    lineales: [{
      id: 1,
      horizontal: true,
      size: 0,
      inicio: true,
      zona: {
        id: 1
      },
      dd: {
        origen_x: 20,
        origen_y: 30,
        x: null,
        y: null
      },
      modulos: [{
        id: 1,
        zona: 1,
        lineal: 1,
        label: '1',
        size: 0,
        horizontal: true,
        color: '#FFC6FF'
      }, {
        id: 2,
        zona: 1,
        lineal: 1,
        label: '2',
        size: 0,
        horizontal: true,
        color: '#FFC6FF'
      }]
    }, {
      id: 2,
      horizontal: false,
      size: 0,
      inicio: true,
      zona: {
        id: 1
      },
      dd: {
        origen_x: 60,
        origen_y: 120,
        x: null,
        y: null
      },
      modulos: [{
        id: 3,
        zona: 1,
        lineal: 2,
        label: '3',
        size: 0,
        horizontal: false,
        color: '#9F9FFF'
      }]
    }]
  }, {
    id: 2,
    width: 600,
    height: 300,
    distancia: 'Cerca',
    almacen: {
      inicio: true,
      zona: {
        id: 2
      },
      dd: {
        origen_x: 410,
        origen_y: 93,
        x: null,
        y: null
      }
    },
    lineales: [{
      id: 3,
      horizontal: true,
      size: 0,
      inicio: true,
      zona: {
        id: 2
      },
      dd: {
        origen_x: 70,
        origen_y: 30,
        x: null,
        y: null
      },
      modulos: [{
        id: 4,
        zona: 2,
        lineal: 3,
        label: '4',
        size: 0,
        horizontal: true,
        color: '#FFC6FF'
      }, {
        id: 5,
        zona: 2,
        lineal: 3,
        label: '5',
        size: 0,
        horizontal: true,
        color: '#FFC6FF'
      }]
    }]
  }, {
    id: 3,
    width: 600,
    height: 300,
    distancia: 'Lejos',
    almacen: null,
    lineales: []
  }, {
    id: 4,
    width: 600,
    height: 300,
    distancia: 'Media',
    almacen: null,
    lineales: []
  }];
  }

  obtenerPosicionLinealZona(lineal, zona){
    for (let i = 0; i < zona.lineales.length; i++) {
      if (zona.lineales[i].id === lineal.id) {
        return i;
      }
    }
    return -1;
  }

  cambiarDatosZonaLineal(lineal, idZona, idZonaNueva, pos) {
    const zonaOrigen = this.zonas[idZona - 1]; // Habria que buscar la zona por id
    const zonaNueva = this.zonas[idZonaNueva - 1]; // Habria que buscar la zona por id
    const linealesZonaActual = zonaOrigen.lineales;
    const posLineal = this.obtenerPosicionLinealZona(lineal, zonaOrigen);
    linealesZonaActual.splice(posLineal, 1);
    lineal.zona = {id: zonaNueva.id};
    zonaNueva.lineales.push(lineal);
    this.actualizarVista = false;
  }

  cambiarDatosZonaAlmacen(almacen, idZona, idZonaNueva, pos) {
    const zonaOrigen = this.zonas[idZona - 1];
    const zonaNueva = this.zonas[idZonaNueva - 1]; // Habria que buscar la zona por id
    zonaOrigen.almacen = null;
    almacen.zona = {id: zonaNueva.id};
    zonaNueva.almacen = almacen;
    // TO DO: A ver si puedo cambiar la posicion por la ultima movida, que no me sale por ser posiciones relativas
    this.actualizarVista = false;
  }

  ngAfterViewInit() {
    console.log('after view component init;');
    // if (this.actualizarVista) {
    //   const vzonas = this.elemZonas.toArray();
    //   for (let i = 0; i < vzonas.length; i++) {
    //     const zona = this.zonas[i];
    //     for (let j = 0; j < zona.lineales.length; j++) {
    //       zona.lineales[j].zona =  {id: zona.id};
    //     }
    //   }
    // }
    // this.actualizarVista = true;
  }

  copiarModuloAZona(horizontal: boolean, zona: any) {
    // Se crea un lineal de un modulo
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
      color: modulo[0].color}];
    transferArrayItem(newmodulo, zona.lineales[pos].modulos, 0, 0);
  }

  copiarModuloV(event: any) {
    console.log('copiando modulo vertical a un nuevo lineal');
    this.copiarModuloAZona(false, this.zonas[0]);
  }

  copiarModuloH(event: any) {
    console.log('copiando modulo horizontal a nuevo lineal');
    this.copiarModuloAZona(true, this.zonas[0]);
  }

  borrarLineal(idZona, idLineal) {
    console.log('Se borra lineal ' + idLineal + ' de zona ' + idZona);
    const posLineal = this.obtenerPosicionLinealZona(idLineal, this.zonas[idZona - 1]);
    this.zonas[idZona - 1].lineales.splice(posLineal, 1);
    console.log(this.zonas);
  }

}
