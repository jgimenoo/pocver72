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
  numBaldas = 9;

  private proporcion = 3.125;
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
    altoReal: 160,
    anchoReal: 128,
    largoReal: 30,
    alto: 500,
    ancho: 400,
    largo: 93.75,
    zoom: 1,
    girar: {
      x: 0,
      y: 0
    }
  };

  this.datosBalda = {
    largoReal: 38.4,
    anchoReal: 128,
    altoReal: 17.7,
    largo: this.modulo.largo, //150
    ancho: this.modulo.ancho, //400
    alto: 0, // luego se calcula
    baldas: []
  };

  this.grupoProductos = [{
    id: 234,
    balda: 1,
    altoReal: 20,
    anchoReal: 9,
    largoReal: 9,
    nombre: 'Pan de molde Bimbo original',
    marca: '',
    imagen: {
      top: null,
      front: '../../../assets/img/pan-molde.png',
      left: null,
      right: null
    },
    seccion: 1,
    cantidad: 5,
    horizontal: true,
    productos: []
  }, {
    id: 775,
    balda: 5,
    altoReal: 15,
    anchoReal: 10,
    largoReal: 3,
    nombre: 'Cheetos',
    marca: '',
    imagen: {
      top: null,
      front: '../../../assets/img/cheetos.jpg',
      left: null,
      right: null
    },
    seccion: 1,
    cantidad: 4,
    horizontal: true,
    productos: []
  }, {
    id: 776,
    balda: 5,
    altoReal: 8.5,
    anchoReal: 2,
    largoReal: 1.5,
    nombre: 'Cepillo de dientes',
    marca: 'Oral-B',
    imagen: {
      top: null,
      front: '../../../assets/img/cepillo-dientes.jpg',
      left: null,
      right: null
    },
    seccion: 1,
    cantidad: 6,
    horizontal: true,
    productos: []
  }, {
    id: 777,
    balda: 5,
    altoReal: 8,
    anchoReal: 6,
    largoReal: 2,
    nombre: 'Licor del polo',
    marca: '',
    imagen: {
      top: null,
      front: '../../../assets/img/licor-polo.jpg',
      left: null,
      right: null
    },
    seccion: 1,
    cantidad: 12,
    horizontal: true,
    productos: []
  }, {
    id: 790,
    balda: 5,
    altoReal: 15,
    anchoReal: 6,
    largoReal: 2.2,
    nombre: 'Aceite corporal',
    marca: 'Johnson',
    imagen: {
      top: null,
      front: '../../../assets/img/aceite-corporal.jpg',
      left: null,
      right: null
    },
    seccion: 1,
    cantidad: 15,
    horizontal: true,
    productos: []
  }, {
    id: 1235,
    balda: 8,
    altoReal: 2,
    anchoReal: 10,
    largoReal: 20,
    nombre: 'Chocolate negro Valor',
    marca: '',
    imagen: {
      top: '../../../assets/img/chocolateValor.jpg',
      front: '../../../assets/img/chocolateValor-front.jpg',
      left: null,
      right: null
    },
    seccion: 1,
    cantidad: 3,
    horizontal: false,  //Se apilan en vertical
    productos: []
  }, {
    id: 1235,
    balda: 8,
    altoReal: 14,
    anchoReal: 5,
    largoReal: 5,
    nombre: 'Leche entera Pascual',
    marca: '',
    imagen: {
      top: null,
      front: '../../../assets/img/leche-pascual.jpg',
      left: '../../../assets/img/leche-pascual.jpg',
      right: '../../../assets/img/leche-pascual.jpg'
    },
    seccion: 3,
    cantidad: 12,
    horizontal: true,
    productos: []
  }];

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
