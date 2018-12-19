import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class MapaTiendaService {

  constructor(
    public http: HttpClient,
    private device: DeviceDetectorService) { }

  obtenerSeccionesTienda() {
    return [{
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
    }, {
      id: 8,
      nombre: 'Pescado fresco',
      color: '#FEC0FE'
    }, {
      id: 9,
      nombre: 'Infantil y bebés',
      color: '#5757FB'
    }];
  }

  obtenerZonasTienda(){
    // Sera la llamada get
    const data = [{
      id: 1,
      saved_width: 500,
      saved_height: 400,
      saved_desktop: true,
      distancia: 'Media',
      almacen: null,
      lineales: [{
        id: 1,
        horizontal: true,
        dd: {
          origen_x: 271,
          origen_y: 11,
          x: null,
          y: null
        },
        modulos: [{
          id: 1,
          colorSeccion: '#FFC6FF'
        }, {
          id: 2,
          colorSeccion: '#FFC6FF'
        }, {
          id: 5,
          colorSeccion: '#FFC6FF'
        }]
      }, {
        id: 2,
        horizontal: false,
        size: 0,
        dd: {
          origen_x: 60,
          origen_y: 120,
          x: null,
          y: null
        },
        modulos: [{
          id: 3,
          colorSeccion: '#9F9FFF'
        }]
      }]
    }, {
      id: 2,
      saved_width: 500,
      saved_height: 400,
      saved_desktop: true,
      distancia: 'Cerca',
      almacen: {
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
        dd: {
          origen_x: 411,
          origen_y: 19,
          x: null,
          y: null
        },
        modulos: [{
          id: 4,
          colorSeccion: '#FFC6FF'
        }]
      }]
    }, {
      id: 3,
      saved_width: 500,
      saved_height: 400,
      saved_desktop: true,
      distancia: 'Lejos',
      almacen: null,
      lineales: []
    }, {
      id: 4,
      saved_width: 500,
      saved_height: 400,
      saved_desktop: true,
      distancia: 'Media',
      almacen: null,
      lineales: []
    }];
    return this.procesarZonasTienda(data);
  }

  procesarZonasTienda(zonas){
    let sizeModulo;
    let widthZona;
    let heightZona;
    let sizeAlmacen;
    if (this.device.isDesktop()) {
      sizeModulo = 1;
      sizeAlmacen = 1;
      widthZona = 500;
      heightZona = 400;
    } else {
      sizeModulo = 0;
      sizeAlmacen = 0;
      widthZona = 350;
      heightZona = 290;
    }
    zonas.forEach(zona => {
      zona.width = widthZona; // Revisar
      zona.height = heightZona; // Revisar
      if (zona.almacen) {
        zona.almacen.size = sizeAlmacen;
        zona.almacen.zona = {
          id: zona.id
        };
      }
      zona.lineales.forEach(lineal => {
        lineal.zona = {
          id: zona.id
        };
        lineal.modulos.forEach(modulo => {
          modulo.zona = zona.id;
          modulo.lineal = lineal.id;
          modulo.label = lineal.id + '';
          modulo.size = sizeModulo;
          modulo.horizontal = lineal.horizontal;
          modulo.color = modulo.colorSeccion;
          delete modulo.colorSeccion;
        });
      });
    });
    return zonas;
  }
}
