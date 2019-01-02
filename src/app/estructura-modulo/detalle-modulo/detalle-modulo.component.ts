import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-modulo',
  templateUrl: './detalle-modulo.component.html',
  styleUrls: ['./detalle-modulo.component.scss']
})
export class DetalleModuloComponent implements OnInit, AfterViewInit {

  public anchoPantalla = 400; // Ancho balda
  public altoPantalla = 500;
  public largoPantalla = 137.5; // Largo balda
  idTienda = 1;

  altoReal = 160;
  anchoReal = 128;
  largoReal = 44; //3.125 de prop.
  startXGrupo = 0;


  public idLineal: number;
  public idModulo: number;

  girarModulo = {
    x: 0,
    y: 0
  };

  zoom = 1;

  public seccion: {
    id: 1,
    nombre: 'Chocolates'
  };

  datosBalda = {
    largo: this.largoPantalla, //150
    ancho: this.anchoPantalla, //400
    alto: 0, // luego se calcula
    largoReal: 38.4,
    anchoReal: 128,
    altoReal: 17.7,
    baldas: [{
      num: 1,
      posXProductos: 0
    }, {
      num: 2,
      posXProductos: 0
    }, {
      num: 3,
      posXProductos: 0
    }, {
      num: 4,
      posXProductos: 0
    }, {
      num: 5,
      posXProductos: 0
    }, {
      num: 6,
      posXProductos: 0
    }, {
      num: 7,
      posXProductos: 0
    }, {
      num: 8,
      posXProductos: 0
    }, {
      num: 9,
      posXProductos: 0
    }]
  };



  N = this.datosBalda.baldas.length;

  grupoProductos= [{
    id: 1235,
    balda: 1,
    altoReal: 2,
    anchoReal: 10,
    largoReal: 20,
    nombre: 'Chocolate negro con almendras',
    marca: '',
    imagen: '',
    seccion: 1,
    cantidad: 3,
    horizontal: false,  //Se apilan en vertical
    productos: []
  }, {
    id: 234,
    balda: 1,
    altoReal: 10,
    anchoReal: 10,
    largoReal: 10,
    nombre: 'Pan de molde',
    marca: '',
    imagen: '',
    seccion: 1,
    cantidad: 5,
    horizontal: true,
    productos: []
  }, {
    id: 775,
    balda: 2,
    altoReal: 12,
    anchoReal: 12,
    largoReal: 20,
    nombre: 'Leche',
    marca: '',
    imagen: '',
    seccion: 1,
    cantidad: 6,
    horizontal: true,
    productos: []
  }];



  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) {
    this.route.params.subscribe(res => {
      this.idLineal = res.idLineal;
      this.idModulo = res.idModulo;
    });
  }

  @ViewChildren('balda') htmlBaldas: QueryList<ElementRef>;


  ngOnInit() {
// Se calculan posiciones y medidas de pantalla en vector de productos
  this.datosBalda.alto = (this.altoPantalla / this.datosBalda.baldas.length); //44.5
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  rotarModulo(x, y){
    this.girarModulo.x = x;
    this.girarModulo.y = y;
  }

  escalarModulo(valor) {
    this.zoom = valor;
  }

  guardarFinalX(event) {
    this.startXGrupo = event;
  }
}
