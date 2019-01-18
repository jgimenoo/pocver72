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
      idProduct: "1",              // nombre del producto
      productname: "Ron",          // pale, medio pale o caja
      seccion:"Alcohol",           //seccion a la que pertenece
      anchoproducto: "10",         // ancho del producto
      altoproducto: "5",           // alto del producto
      largoproducto:"10",          // largo del producto
      volumentotal: "500",         // ancho x alto x largo
      area: "50"                   //alto x ancho
          },
    {
      idProduct: "2",              // nombre del producto
      productname: "Ginebra",      // pale, medio pale o caja
      seccion:"Alcohol",           //seccion a la que pertenece
      anchoproducto: "10",         // ancho del producto
      altoproducto: "10",          // alto del producto
      largoproducto:"10",          // largo del producto
      volumentotal: "1000",        // ancho x alto x largo
      area: "100"                  //alto x ancho

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
  getSection(){
    return this.secciones;
  }
  getDataProducts() {
    return this.dataproducts;
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
      idProduct: event.idProduct,
      productname: event.productname,
      seccion: event.seccion,
      anchoproducto: event.anchoproducto,
      altoproducto: event.altoproducto,
      largoproducto: event.largoproducto,
      volumentotal: event.volumentotal,
      area: event.area,
    })
    .subscribe();
}

addProduct(event) {
  this.http
    .post<any>(`${config.basePath}product-property/addProduct`, {
      idProduct: event.idProduct,
      productname: event.productname,
      seccion: event.seccion,
      anchoproducto: event.anchoproducto,
      altoproducto: event.altoproducto,
      largoproducto: event.largoproducto,
      volumentotal: event.volumentotal,
      area: event.area,
    })
    .subscribe();
  }
  getProduct() {
    return this.product;
  }
}
