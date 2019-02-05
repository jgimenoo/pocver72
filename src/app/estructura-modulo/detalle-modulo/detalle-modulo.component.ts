import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ModuloComponent } from '../../estructura-tienda/modulo/modulo.component';
import { EstructuraModuloService } from '../estructura-modulo.service';

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
    private cd: ChangeDetectorRef,
    private moduloService: EstructuraModuloService) {
    this.route.params.subscribe(res => {
      this.idLineal = res.idLineal;
      this.idModulo = res.idModulo;
    });
  }

  ngOnInit() {
/*
  this.modulo = {
    id: this.idModulo,
    lineal: this.idLineal,
    refrigerado: false,
    altoReal: 180,
    anchoReal: 120,
    largoReal: 40, // no refrigerado. largo real incluido el grosor de pared
    //largoReal: 44, // refrigerado
    grosorPared: 5, // no refrigerado
    //grosorPared: 9.18, // refrigerado
    //numBaldas: 4,  // refrigerado
    numBaldas: 5,
    // alto: 500,
    // ancho: 400,
    // largo: 133.26,
    alto: 50.56,  // modelo 3D
    ancho: 33.71,  // modelo 3D
    largo: 11.24,  // no refrigerado. modelo 3D, largo incluido el grosor de pared
    //largo: 12.37, // refrigerado
    grosor: 1.40,  // no refrigerado
    //grosor: 2.58, // refrigerado
  };*/

  // Grosor de balda: 2cm
  /*
  this.datosBalda = {
    largoReal: 35,  // Profunidad util real de la balda
    anchoReal: 120, // Ancho util real de la balda
    altoReal: 2,  // Alto util real de la balda
    //altoReal: 34,  // Altura entre baldas
    largo: 9.84, // Hay que quitar el grosor del módulo en vertical
    largoBase: 13, // para refrigerado, solo en apariencia
    ancho: 33.7,  // Ancho en pantalla de balda
    separacion: 0, // Altura en pantalla entre baldas. Se calcula posteriormente
    alto: 0.56,  // Alto util de la balda en pantalla    
    baldas: []  // Desde esto se saca el numero de baldas
  };*/

  /*
  this.grupoProductos = [{
    id: 230,
    balda: 1,
    altoReal: 21.906,
    anchoReal: 14.970,
    largoReal: 8.031,
    nombre: 'Cereales',
    fichero3d: 'cereales.glb',
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
    fichero3d: 'pan-molde.glb',
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
    fichero3d: 'jabon-dove.glb',
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
    fichero3d: 'desodorante-dove.glb',
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
    fichero3d: 'gel-dove.glb',
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
    fichero3d: 'detergente-ariel.glb',
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
    fichero3d: 'skip.glb',
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
    fichero3d: 'mejillones.glb',
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
    fichero3d: 'sobres-nescafe.glb',
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
    fichero3d: 'cafe-saimaza.glb',
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
    fichero3d: 'cava1.glb',
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
    fichero3d: 'cava2.glb',
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
    fichero3d: 'vino.glb',
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
    fichero3d: 'leche-puleva.glb',
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
    fichero3d: 'pizza.glb',
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
    fichero3d: 'garrafa-aceite.glb',
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
    fichero3d: 'agua.glb',
    seccion: 1,
    cantidad: 12,
    horizontal: true,
    productos: []
  }
  , {
    id: 260,
    balda: 5,
    altoReal: 8.409,
    anchoReal: 5.607,
    largoReal: 5.607,
    nombre: 'Fabada',
    fichero3d: 'fabada.glb',
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
    fichero3d: 'galletas-principe.glb',
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
    fichero3d: 'artiach.glb',
    seccion: 1,
    cantidad: 8,
    horizontal: false,
    productos: []
  }, {
    id: 263,
    balda: 5,
    altoReal: 15.735,
    anchoReal: 15.059,
    largoReal: 3.759,
    nombre: 'Galletas',
    fichero3d: 'galletas-marbu.glb',
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
    fichero3d: 'galletas-dino.glb',
    seccion: 1,
    cantidad: 24,
    horizontal: false,
    productos: []
  }

];*/
/*
  this.seccion = {
    id: 1,
    nombre: 'Varios'
  };*/

  
  this.moduloService.obtenerProductosModulo(1).subscribe(data => {
    this.modulo = {
      id: data.id,
      lineal: data.lineal,
      refrigerado: data.refrigerado,
      altoReal: data.alto,
      anchoReal: data.ancho,
      largoReal: data.largo,
      grosorReal: data.grosorPared,
      numBaldas: data.baldas.length,
      alto: data.alto / this.proporcion,
      ancho: data.ancho / this.proporcion,
      largo: data.largo / this.proporcion,
      grosor: data.grosorPared / this.proporcion
    };
    this.datosBalda = {
      altoReal: data.baldas[0].alto,
      anchoReal: data.baldas[0].ancho,
      largoReal: data.baldas[0].largo,
      alto: data.baldas[0].alto / this.proporcion,
      ancho: data.baldas[0].ancho / this.proporcion,
      largo: data.baldas[0].largo / this.proporcion,
      baldas: []
    };
    if (! data.refrigerado) {
      this.datosBalda.separacion = (this.modulo.alto / this.modulo.numBaldas); // No es el alto util
      this.datosBalda.largoBase = data.largo;
    } else {
      this.datosBalda.separacion = (this.modulo.alto / (this.modulo.numBaldas + 1) );
      this.datosBalda.largoBase = 13; // para aumentar visualmente el largo de la base
    }
    for ( let aux = 0; aux < this.modulo.numBaldas; aux++) {
      this.datosBalda.baldas.push({
        num: aux + 1,
        posXProductos: 0
      });
    };
    this.seccion = {
      id: data.seccion
    };
    this.grupoProductos = [];
    data.baldas.forEach(balda => {
      for (let i = 0; i < balda.productos.length; i++) {
        const prod = balda.productos[i];
        this.grupoProductos.push({
          id: prod.id,
          balda: balda.id,
          altoReal: prod.alto,
          anchoReal: prod.ancho,
          largoReal: prod.largo,
          nombre: prod.nombre,
          variableLogistica: prod.variableLogistica,
          fichero3d: prod.fichero3d,
          seccion: this.seccion.id,
          cantidad: prod.cantidad_total,
          horizontal: (prod.cantidad_alto === 1),
          cantidad_alto: prod.cantidad_alto,
          cantidad_ancho: prod.cantidad_ancho,
          cantidad_largo: prod.cantidad_largo,
          productos: []
        });
      }
    });
  });

  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  // rotarModulo(x, y){
  //   this.modulo.girar.x = x;
  //   this.modulo.girar.y = y;
  // }

  // escalarModulo(valor) {
  //   this.modulo.zoom = valor;
  // }


}
