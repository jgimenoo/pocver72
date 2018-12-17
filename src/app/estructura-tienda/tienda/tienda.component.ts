import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { NbSidebarService } from '@nebular/theme/components/sidebar/sidebar.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements  OnInit, AfterViewInit  {


  @ViewChildren('czona') elemZonas: QueryList<any>;

  constructor(
    private renderer: Renderer2) { }

  moduloV = [{id: 0, label: '', size: 0, horizontal: false, color: '#fff'}];
  moduloH = [{id: 0, label: '', size: 0, horizontal: true, color: '#fff'}];

  contadorModulo = 5;
  contadorLineal = 3;

  area = {
    top: 70,
    left: 250
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

  secciones = [{
    id: 1,
    nombre: 'Galletas',
    color: '#9F9FFF'
  }, {
    id: 2,
    nombre: 'Limipieza de cocina',
    color: '#FF9F9F'
  }, {
    id: 3,
    nombre: 'Legumbres',
    color: '#9EFFFF'
  }, {
    id: 4,
    nombre: 'Panaderia',
    color: '#FF7878'
  }, {
    id: 5,
    nombre: 'Pescado congelado',
    color: '#9EFF9E'
  }, {
    id: 6,
    nombre: 'Fruta',
    color: '#45D845'
  }, {
    id: 7,
    nombre: 'Verdura',
    color: '#53B153'
  }];

  ngOnInit() {
   // Construir el mapa segun lo guardado en BD
   this.zonas = [{
    id: 1,
    width: 600,
    height: 25,
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
    height: 25,
    distancia: 'Cerca',
    almacen: {
      inicio: true,
      zona: {
        id: 2
      },
      dd: {
        origen_x: 310,
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
    height: 25,
    distancia: 'Lejos',
    almacen: null,
    lineales: []
  }, {
    id: 4,
    width: 600,
    height: 25,
    distancia: 'Media',
    almacen: null,
    lineales: []
  }];
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
