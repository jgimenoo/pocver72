import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService{

  constructor() { }

  createDb() {
    return {
      'zonasMapa': [{
        id: 1,
        saved_width: 500,
        saved_height: 400,
        saved_desktop: true,
        almacen: null,
        lineales: [{
          id: 1,
          horizontal: true,
          origen_x: 271,
          origen_y: 11,
          modulos: [{
            id: 15,
            colorSeccion: '#FFC6FF'
          }, {
            id: 16,
            colorSeccion: '#FFC6FF'
          }, {
            id: 17,
            colorSeccion: '#FFC6FF'
          }]
        }, {
          id: 2,
          horizontal: false,
          size: 0,
          origen_x: 60,
          origen_y: 120,
          modulos: [{
            id: 18,
            colorSeccion: '#9F9FFF'
          }]
        }]
      }, {
        id: 2,
        saved_width: 500,
        saved_height: 400,
        saved_desktop: true,
        almacen: {
            origen_x: 310,
            origen_y: 93
        },
        lineales: [{
          id: 3,
          horizontal: true,
          origen_x: 411,
          origen_y: 19,
          modulos: [{
            id: 19,
            colorSeccion: '#FFC6FF'
          }]
        }]
      }, {
        id: 3,
        saved_width: 500,
        saved_height: 400,
        saved_desktop: true,
        almacen: null,
        lineales: []
      }, {
        id: 4,
        saved_width: 500,
        saved_height: 400,
        saved_desktop: true,
        almacen: null,
        lineales: []
      }],

      'seccionesMapa': [{
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
      }]
    };
  }
}
