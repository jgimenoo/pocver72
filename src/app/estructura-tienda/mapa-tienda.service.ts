import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaTiendaService {

  constructor(public http: HttpClient) { }

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
    }];
  }

  obtenerZonasTienda(){
    return [{
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
          origen_x: 110,
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
}
