import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService{

  constructor() { }

  createDb() {
    return {
      'mapaTienda': [{
        id: 1,
        secciones: [{
          id: 1,
          nombre: 'Galletas',
          color: '#9F9FFF'
        }, {
          id: 2,
          nombre: 'Limpieza de cocina',
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
        }],
        zonas: [{
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
            refrigerado: false,
            modulos: [{
              id: 15,
              seccion: 3,
              colorSeccion: '#9EFFFF'
            }, {
              id: 16,
              seccion: 3,
              colorSeccion: '#9EFFFF'
            }, {
              id: 17,
              seccion: 3,
              colorSeccion: '#9EFFFF'
            }]
          }, {
            id: 2,
            horizontal: false,
            size: 0,
            origen_x: 60,
            origen_y: 120,
            refrigerado: true,
            modulos: [{
              id: 18,
              seccion: 1,
              colorSeccion: '#9F9FFF'
            }]
          }]
        }, {
          id: 2,
          saved_width: 500,
          saved_height: 400,
          saved_desktop: true,
          almacen: {
              origen_x: 265,
              origen_y: 215
          },
          lineales: [{
            id: 3,
            horizontal: true,
            origen_x: 411,
            origen_y: 19,
            refrigerado: false,
            modulos: [{
              id: 19,
              seccion: 5,
              colorSeccion: '#9EFF9E'
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
        }]
      }],
      productosModulo: [{
        id: 1,
        lineal: 1,
        refrigerado: false,
        alto: 180,
        ancho: 120,
        largo: 40,
        grosorPared: 5,
        seccion: 1,
        baldas: [{
          id: 1,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 1,
            nombre: 'Cereales Perico',
            variableLogistica: 1,
            alto: 21.906,
            ancho: 14.97,
            largo: 8.031,
            fichero3d: 'cereales.glb',
            cantidad_total: 15,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 4
          }, {
            id: 2,
            nombre: 'Pan de molde Bimbo',
            variableLogistica: 1,
            alto: 20.007,
            ancho: 9.010,
            largo: 9.010,
            fichero3d: 'pan-molde.glb',
            cantidad_total: 12,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 3
          }]
        }, {
          id: 2,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 3,
            nombre: 'Jabón Dove',
            variableLogistica: 1,
            alto: 5.376,
            ancho: 7.298,
            largo: 2.955,
            fichero3d: 'jabon-dove.glb',
            cantidad_total: 15,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 8
          }, {
            id: 4,
            nombre: 'Desodorante Dove',
            variableLogistica: 1,
            alto: 14.535,
            ancho: 3.642,
            largo: 3.642,
            fichero3d: 'desodorante-dove.glb',
            cantidad_total: 15,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 8
          }, {
            id: 5,
            nombre: 'Gel Dove',
            variableLogistica: 1,
            alto: 14.347,
            ancho: 5.852,
            largo: 5.091,
            fichero3d: 'gel-dove.glb',
            cantidad_total: 10,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 5
          }, {
            id: 6,
            nombre: 'Detergente Ariel',
            variableLogistica: 1,
            alto: 32.375,
            ancho: 22.286,
            largo: 7.569,
            fichero3d: 'detergente-ariel.glb',
            cantidad_total: 5,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 3
          }, {
            id: 7,
            nombre: 'Detergente Skip',
            variableLogistica: 1,
            alto: 20.534,
            ancho: 19.455,
            largo: 6.550,
            fichero3d: 'skip.glb',
            cantidad_total: 10,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 5
          }]
        }, {
          id: 3,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 8,
            nombre: 'Mejillones Pica',
            variableLogistica: 1,
            alto: 5.269,
            ancho: 8.188,
            largo: 2.350,
            fichero3d: 'mejillones.glb',
            cantidad_total: 20,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 10
          }, {
            id: 9,
            nombre: 'Café soluble sobres Nescafé',
            variableLogistica: 1,
            alto: 5.233,
            ancho: 4.592,
            largo: 3.489,
            fichero3d: 'sobres-nescafe.glb',
            cantidad_total: 20,
            cantidad_alto: 1,
            cantidad_ancho: 3,
            cantidad_largo: 7
          }, {
            id: 10,
            nombre: 'Café Saimaza',
            variableLogistica: 1,
            alto: 8.758,
            ancho: 5.198,
            largo: 2.706,
            fichero3d: 'cafe-saimaza.glb',
            cantidad_total: 20,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 10
          }, {
            id: 11,
            nombre: 'Cava 1',
            variableLogistica: 1,
            alto: 21,
            ancho: 5.6,
            largo: 5.6,
            fichero3d: 'cava1.glb',
            cantidad_total: 20,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 5
          }, {
            id: 12,
            nombre: 'Cava 2',
            variableLogistica: 1,
            alto: 21,
            ancho: 5.6,
            largo: 5.6,
            fichero3d: 'cava2.glb',
            cantidad_total: 20,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 5
          }, {
            id: 13,
            nombre: 'Vino reserva Chateau Les Arcs',
            variableLogistica: 1,
            alto: 18.370,
            ancho: 4.95,
            largo: 4.95,
            fichero3d: 'vino.glb',
            cantidad_total: 20,
            cantidad_alto: 1,
            cantidad_ancho: 3,
            cantidad_largo: 7
          }]
        }, {
          id: 4,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 14,
            nombre: 'Leche Puleva',
            variableLogistica: 1,
            alto: 15.308,
            ancho: 7.12,
            largo: 4.98,
            fichero3d: 'leche-puleva.glb',
            cantidad_total: 30,
            cantidad_alto: 1,
            cantidad_ancho: 5,
            cantidad_largo: 6
          }, {
            id: 15,
            nombre: 'Pizza la Toscana',
            variableLogistica: 1,
            alto: 1.4,
            ancho: 17.266,
            largo: 18.263,
            fichero3d: 'pizza.glb',
            cantidad_total: 7,
            cantidad_alto: 7,
            cantidad_ancho: 1,
            cantidad_largo: 1
          }, {
            id: 16,
            nombre: 'Aceite 2 Litros La Aceituna',
            variableLogistica: 1,
            alto: 23.1,
            ancho: 10.68,
            largo: 10.68,
            fichero3d: 'garrafa-aceite.glb',
            cantidad_total: 12,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 3
          }, {
            id: 17,
            nombre: 'Aqua Bona',
            variableLogistica: 1,
            alto: 24,
            ancho: 6.76,
            largo: 6.76,
            fichero3d: 'agua.glb',
            cantidad_total: 12,
            cantidad_alto: 1,
            cantidad_ancho: 3,
            cantidad_largo: 4
          }]
        }, {
          id: 5,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 18,
            nombre: 'Fabada la Asturiana',
            variableLogistica: 1,
            alto: 8.409,
            ancho: 5.607,
            largo: 5.607,
            fichero3d: 'fabada.glb',
            cantidad_total: 7,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 4
          }, {
            id: 19,
            nombre: 'Galletas Príncipe',
            variableLogistica: 1,
            alto: 8.971,
            ancho: 23.674,
            largo: 4.201,
            fichero3d: 'galletas-principe.glb',
            cantidad_total: 5,
            cantidad_alto: 1,
            cantidad_ancho: 1,
            cantidad_largo: 5
          }, {
            id: 20,
            nombre: 'Surtido Artiach',
            variableLogistica: 1,
            alto: 3.489,
            ancho: 18.939,
            largo: 17.871,
            fichero3d: 'artiach.glb',
            cantidad_total: 8,
            cantidad_alto: 8,
            cantidad_ancho: 1,
            cantidad_largo: 1
          }, {
            id: 21,
            nombre: 'Galletas Marbú Dorada',
            variableLogistica: 1,
            alto: 15.735,
            ancho: 15.059,
            largo: 3.759,
            fichero3d: 'galletas-marbu.glb',
            cantidad_total: 5,
            cantidad_alto: 1,
            cantidad_ancho: 1,
            cantidad_largo: 5
          }, {
            id: 22,
            nombre: 'Galletas Dinosaurius',
            variableLogistica: 1,
            alto: 8.615,
            ancho: 21,
            largo: 7.12,
            fichero3d: 'galletas-dino.glb',
            cantidad_total: 24,
            cantidad_alto: 3,
            cantidad_ancho: 2,
            cantidad_largo: 4
          }]
        }]
      }, {
        id: 2,
        lineal: 2,
        refrigerado: true,
        alto: 180,
        ancho: 120,
        largo: 44,
        grosorPared: 9.18,
        seccion: 2,
        baldas: [{
          id: 1,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 30,
            nombre: 'Leche fresca Puleva',
            variableLogistica: 1,
            alto: 17.3,
            ancho: 6.657,
            largo: 6.657,
            fichero3d: 'leche-fresca-puleva.glb',
            cantidad_total: 16,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 4
          }, {
            id: 31,
            nombre: 'Crema de leche',
            variableLogistica: 1,
            alto: 15.878,
            ancho: 6.4,
            largo: 6.76,
            fichero3d: 'crema-leche.glb',
            cantidad_total: 8,
            cantidad_alto: 1,
            cantidad_ancho: 2,
            cantidad_largo: 4
          }, {
            id: 32,
            nombre: 'Leche Asturiana sin lactosa',
            variableLogistica: 1,
            alto: 21.36,
            ancho: 7.12,
            largo: 7.12,
            fichero3d: 'asturiana-sinlactosa.glb',
            cantidad_total: 16,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 4
          }, {
            id: 33,
            nombre: 'Leche Asturiana desnatada',
            variableLogistica: 1,
            alto: 21.36,
            ancho: 7.12,
            largo: 7.12,
            fichero3d: 'asturiana-desnatada.glb',
            cantidad_total: 16,
            cantidad_alto: 1,
            cantidad_ancho: 4,
            cantidad_largo: 4
          }]
        }, {
          id: 2,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 40,
            nombre: 'Yogures Vitalinea',
            variableLogistica: 1,
            alto: 6.23,
            ancho: 12.5,
            largo: 12.5,
            fichero3d: 'pack-vitalinea.glb',
            cantidad_total: 8,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 2
          }, {
            id: 41,
            nombre: 'Yogures Nutricia blanco',
            variableLogistica: 1,
            alto: 6.62,
            ancho: 10.53,
            largo: 10.57,
            fichero3d: 'pack-nutricia.glb',
            cantidad_total: 8,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 2
          }, {
            id: 42,
            nombre: 'Yogures Activia',
            variableLogistica: 1,
            alto: 6.23,
            ancho: 12.5,
            largo: 12.5,
            fichero3d: 'pack-activia.glb',
            cantidad_total: 12,
            cantidad_alto: 2,
            cantidad_ancho: 3,
            cantidad_largo: 2
          }, {
            id: 43,
            nombre: 'Yogures Danone natural',
            variableLogistica: 1,
            alto: 6.23,
            ancho: 12.5,
            largo: 12.5,
            fichero3d: 'pack-danone.glb',
            cantidad_total: 12,
            cantidad_alto: 2,
            cantidad_ancho: 3,
            cantidad_largo: 2
          }]
        }, {
          id: 3,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 50,
            nombre: 'Margarina Ligeresa',
            variableLogistica: 1,
            alto: 4.76,
            ancho: 13.42,
            largo: 7.83,
            fichero3d: 'margarina-ligeresa.glb',
            cantidad_total: 16,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 4
          }, {
            id: 51,
            nombre: 'Margarina Flora',
            variableLogistica: 1,
            alto: 4.76,
            ancho: 13.42,
            largo: 7.83,
            fichero3d: 'margarina-flora.glb',
            cantidad_total: 16,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 4
          }, {
            id: 52,
            nombre: 'Margarina Flora colesterol',
            variableLogistica: 1,
            alto: 4.76,
            ancho: 13.42,
            largo: 7.83,
            fichero3d: 'margarina-flora-col.glb',
            cantidad_total: 16,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 4
          }]
        }, {
          id: 4,
          alto: 2,
          ancho: 120,
          largo: 35,
          productos: [{
            id: 60,
            nombre: 'Queso Finca la Cuadra',
            variableLogistica: 1,
            alto: 6.3,
            ancho: 13.67,
            largo: 13.67,
            fichero3d: 'queso-manchego1.glb',
            cantidad_total: 8,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 2
          }, {
            id: 61,
            nombre: 'Queso oveja añejo',
            variableLogistica: 1,
            alto: 6.3,
            ancho: 10.8,
            largo: 10.8,
            fichero3d: 'queso-manchego2.glb',
            cantidad_total: 8,
            cantidad_alto: 2,
            cantidad_ancho: 2,
            cantidad_largo: 2
          }]
        }]
      }]
    };
  }
}
