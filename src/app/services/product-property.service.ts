import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductPropertyService {
  product: any[] = [];

  constructor(private http: HttpClient) { }
  dataproducts = [
    {
      cod_prod: "1",               // nombre del producto
      descripcion: "Ron",          // pale, medio pale o caja
      seccion:"Alcohol",           //seccion a la que pertenece
      refrigerado:"Si",
      variable_logistica_alm:"Unidad",  
      ancho_alm: "10",             // ancho del producto
      alto_alm: "5",               // alto del producto
      largo_alm:"10",              // largo del producto
      volumen_alm: "500",          // ancho x alto x largo
      area_alm: "50"               //alto x ancho
          },
    {
      cod_prod: "2",               // nombre del producto
      descripcion: "Ginebra",      // pale, medio pale o caja
      seccion:"Alcohol",           //seccion a la que pertenece
      refrigerado:"No",
      variable_logistica_alm:"Unidad",  
      ancho_alm: "10",             // ancho del producto
      alto_alm: "5",               // alto del producto
      largo_alm:"10",              // largo del producto
      volumen_alm: "500",          // ancho x alto x largo
      area_alm: "50"               //alto x ancho

    }
  ];
  secciones=[
    {value: 'Perfumeria', title: 'Perfumeria'},
    {value: 'Alcoholes', title: 'Alcoholes'},
    {value: 'Horno', title: 'Horno'},
    {value: 'Pescado', title: 'Pescado'}, 
    {value: 'Fruta y verdura', title: 'Fruta y verdura'},
    {value: 'Carne', title: 'Carne'},
  ]

  refrigerado=[
    {value: 'Si', title: 'Si'},
    {value: 'No', title: 'No'},
  ]

  variablelog=[
    {value: 'caja', title: 'Caja'},
    {value: 'palet', title: 'Palet'}, 
    {value: 'medio_palet', title: 'Medio Palet'},
    {value: 'unidad', title: 'Unidades'},
  ]

  getSection(){
    return this.secciones;
  }
  getRefrigerado(){
    return this.refrigerado;
  }
  getDataProducts() {
    return this.dataproducts;
  }
  getVariablelog(){
    return this.variablelog;
  }
  
deleteProduct(event): void {
  this.http
 .post<any>(`${config.basePath}product-property/deleteProduct`, {  
})
console.log(event);

}

editProduct(event) {
  this.http
    .post<any>(`${config.basePath}product-property/editProduct`, {
      cod_prod: event.cod_prod,
      descripcion: event.descripcion,
      seccion: event.seccion,
      refrigerado: event.refrigerado,
      variable_logistica_alm: event.variable_logistica_alm,
      ancho_alm: event.ancho_alm,
      alto_alm: event.alto_alm,
      largo_alm: event.largo_alm,
      volumen_alm: event.volumen_alm,
      area_alm: event.area_alm,
    })
    .subscribe();
}

addProduct(event) {
  this.http
    .post<any>(`${config.basePath}product-property/addProduct`, {
      cod_prod: event.cod_prod,
      descripcion: event.descripcion,
      seccion: event.seccion,
      refrigerado: event.refrigerado,
      variable_logistica_alm: event.variable_logistica_alm,
      ancho_alm: event.ancho_alm,
      alto_alm: event.alto_alm,
      largo_alm: event.largo_alm,
      volumen_alm: event.volumen_alm,
      area_alm: event.area_alm,
    })
    .subscribe();
  }
  getProduct() {
    return this.product;
  }
}
