import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ModuloComponent } from '../../estructura-tienda/modulo/modulo.component';

@Component({
  selector: 'app-detalle-modulo',
  templateUrl: './detalle-modulo.component.html',
  styleUrls: ['./detalle-modulo.component.scss']
})
export class DetalleModuloComponent implements OnInit, AfterViewInit {

  public idLineal: number;
  public idModulo: number;
  public idTienda = 1;

  private proporcion = 3.56;
  modulo: any;
  datosBalda: any;
  grupoProductos: any;
  seccion: any;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) {
    this.route.params.subscribe(res => {
      this.idLineal = res.idLineal;
      this.idModulo = res.idModulo;
    });
  }

  ngOnInit() {

  this.modulo = {
    id: this.idModulo,
    lineal: this.idLineal,
    altoReal: 180,
    anchoReal: 120,
    largoReal: 40,
    grosorPared: 5,
    numBaldas: 5,
    // alto: 500,
    // ancho: 400,
    // largo: 133.26,
    alto: 50.56,  // modelo 3D
    ancho: 33.71,  // modelo 3D
    largo: 11.24,  // modelo 3D
    grosor: 1.40,
    zoom: 1,
    girar: {
      x: 0,
      y: 0
    }
  };

  // Grosor de balda: 2cm
  this.datosBalda = {
    largoReal: 35,  // Profunidad util real de la balda
    anchoReal: 120, // Ancho util real de la balda
    altoBaldaReal: 2,  // Alto util real de la balda
    altoReal: 34,  // Altura entre baldas
    largo: 9.84, // Hay que quitar el grosor del módulo en vertical
    ancho: 33.7,  // Ancho en pantalla de balda
    alto: 0, // Altura en pantalla entre baldas. Se calcula posteriormente
    altoBalda: 0.56,  // Alto util de la balda en pantalla
    baldas: []  // Desde esto se saca el numero de baldas
  };

  this.grupoProductos = [{
    id: 230,
    balda: 1,
    altoReal: 21.906,
    anchoReal: 14.970,
    largoReal: 8.031,
    nombre: 'Cereales',
    marca: 'Perico',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'cereales.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 15,
    horizontal: true,
    productos: []
  }, {
    id: 231,
    balda: 1,
    altoReal: 20.007,
    anchoReal: 9.010,
    largoReal: 9.010,
    nombre: 'Pan de molde Bimbo original',
    marca: 'Bimbo',
    imagen: {
      top: null,
      front: '../../../assets/img/pan-molde.png',
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'pan-molde.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 12,
    horizontal: true,
    productos: []
  }, {
    id: 232,
    balda: 2,
    altoReal: 5.376,
    anchoReal: 7.298,
    largoReal: 2.955,
    nombre: 'Jabón',
    marca: 'Dove',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'jabon-dove.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 15,
    horizontal: true,
    productos: []
  }, {
    id: 240,
    balda: 2,
    altoReal: 14.535,
    anchoReal: 3.642,
    largoReal: 3.642,
    nombre: 'Desodorante',
    marca: 'Dove',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'desodorante-dove.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 15,
    horizontal: true,
    productos: []
  }, {
    id: 241,
    balda: 2,
    altoReal: 14.347,
    anchoReal: 5.852,
    largoReal: 5.091,
    nombre: 'Gel',
    marca: 'Dove',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'gel-dove.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 10,
    horizontal: true,
    productos: []
  }, {
    id: 300,
    balda: 2,
    altoReal: 32.375,
    anchoReal: 22.286,
    largoReal: 7.569,
    nombre: 'Detergente',
    marca: 'Ariel',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'detergente-ariel.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 5,
    horizontal: true,
    productos: []
  }, {
    id: 301,
    balda: 2,
    altoReal: 20.534,
    anchoReal: 19.455,
    largoReal: 6.550,
    nombre: 'Detergente',
    marca: 'Skip',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'skip.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 10,
    horizontal: true,
    productos: []
  }, {
    id: 404,
    balda: 3,
    altoReal: 5.269,
    anchoReal: 8.188,
    largoReal: 2.350,
    nombre: 'Mejillones',
    marca: 'Pica',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'mejillones.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 20,
    horizontal: true,
    productos: []
  }, {
    id: 400,
    balda: 3,
    altoReal: 5.233,
    anchoReal: 4.592,
    largoReal: 3.489,
    nombre: 'Café soluble sobres',
    marca: 'Nescafé',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'sobres-nescafe.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 20,
    horizontal: true,
    productos: []
  }, {
    id: 401,
    balda: 3,
    altoReal: 8.758,
    anchoReal: 5.198,
    largoReal: 2.706,
    nombre: 'Café',
    marca: 'Saimaza',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'cafe-saimaza.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 20,
    horizontal: true,
    productos: []
  }, {
    id: 401,
    balda: 3,
    altoReal: 21,
    anchoReal: 5.6,
    largoReal: 5.6,
    nombre: 'Cava',
    marca: 'no se',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'cava1.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 20,
    horizontal: true,
    productos: []
  }, {
    id: 402,
    balda: 3,
    altoReal: 21,
    anchoReal: 5.6,
    largoReal: 5.6,
    nombre: 'Cava',
    marca: 'otra marca',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'cava2.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 20,
    horizontal: true,
    productos: []
  }, {
    id: 403,
    balda: 3,
    altoReal: 18.370,
    anchoReal: 4.95,
    largoReal: 4.95,
    nombre: 'Vino',
    marca: 'otra marca',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'vino.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 20,
    horizontal: true,
    productos: []
  },{
    id: 243,
    balda: 4,
    altoReal: 15.308,
    anchoReal: 7.12,
    largoReal: 4.98,
    nombre: 'Leche',
    marca: 'Puleva',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'leche-puleva.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 30,
    horizontal: true,
    productos: []
  }, {
    id: 250,
    balda: 4,
    altoReal: 1.4,
    anchoReal: 17.266,
    largoReal: 18.263,
    nombre: 'Pizza',
    marca: 'La Toscana',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'pizza.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 7,
    horizontal: false,
    productos: []
  }, {
    id: 251,
    balda: 4,
    altoReal: 23.1,
    anchoReal: 10.68,
    largoReal: 10.68,
    nombre: 'Aceite 2L',
    marca: 'Nuse',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'garrafa-aceite.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 12,
    horizontal: true,
    productos: []
  }, {
    id: 252,
    balda: 4,
    altoReal: 24,
    anchoReal: 6.76,
    largoReal: 6.76,
    nombre: 'Agua',
    marca: 'Bona',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'agua.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 12,
    horizontal: true,
    productos: []
  }, {
    id: 260,
    balda: 5,
    altoReal: 8.409,
    anchoReal: 5.607,
    largoReal: 5.607,
    nombre: 'Fabada',
    marca: 'La Asturiana',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'fabada.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 7,
    horizontal: true,
    productos: []
  }, {
    id: 261,
    balda: 5,
    altoReal: 8.971,
    anchoReal: 23.674,
    largoReal: 4.201,
    nombre: 'Galletas',
    marca: 'Principe',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'galletas-principe.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 5,
    horizontal: true,
    productos: []
  }, {
    id: 262,
    balda: 5,
    altoReal: 3.489,
    anchoReal: 18.939,
    largoReal: 17.871,
    nombre: 'Surtido',
    marca: 'Artiach',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'artiach.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 5,
    horizontal: false,
    productos: []
  }, {
    id: 263,
    balda: 5,
    altoReal: 15.735,
    anchoReal: 15.059,
    largoReal: 3.759,
    nombre: 'Galletas',
    marca: 'Marbú Dorada',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'galletas-marbu.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 5,
    horizontal: true,
    productos: []
  }, {
    id: 264,
    balda: 5,
    altoReal: 8.615,
    anchoReal: 21,
    largoReal: 7.12,
    nombre: 'Galletas',
    marca: 'Dinosaurius',
    imagen: {
      top: null,
      front: null,
      left: null,
      right: null
    },
    modelo: {
      path: '../../../assets/img/models/',
      nombre: 'galletas-dino.glb',
      textura: '',
      json: ''
    },
    seccion: 1,
    cantidad: 7,
    horizontal: true,
    productos: []
  }

];

  this.seccion = {
    id: 1,
    nombre: 'Chocolates'
  };
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  rotarModulo(x, y){
    this.modulo.girar.x = x;
    this.modulo.girar.y = y;
  }

  escalarModulo(valor) {
    this.modulo.zoom = valor;
  }


}
