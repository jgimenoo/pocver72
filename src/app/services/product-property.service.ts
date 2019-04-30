import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { map, catchError } from 'rxjs/operators'; 
import { map, filter, switchMap, retry } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class ProductPropertyService {
  productos: any[] = [];

  constructor(private http: HttpClient) { }
  /*dataproducts = [
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

  ];*/

  secciones= [
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
  /*GetProductos() {
    return this.product;
  } */
  getVariablelog(){
  return this.variablelog;
}


  getSection(){
    return this.secciones;
  }
  setSection(cod_seccion: number,descripcion: string ){
    return this.http
      .post<any>(`${config.basePath}secciones`, {
        cod_seccion: cod_seccion,
        descripcion: descripcion,
      })
  }
  getRefrigerado(){
    return this.refrigerado;
  }
  setRefrigerado(refrigerado: any){
    this.refrigerado = refrigerado;
  }
  /*getDataProducts() {
    return this.dataproducts;
  }
  setDataProducts(dataproducts: any){
    this.dataproducts = dataproducts;
  } */
 
 /* getProductos(): Observable<any>{
    return this.http.get(`${config.basePath}getproducto`).pipe(map(data => {})).subscribe(result => {
      console.log(result);
    });
  }*/

  
  getProductos(): Observable<any> {
   return this.http.get(`${config.basePath}getproducto`).pipe(map(response => {
      return response;
    }));
   // return this.http.get('http://10.80.93.17:8080/getproductos')
   // .pipe(map(res => res));

  }
  
  
    setProductos(dataProductos: any){
      this.productos = dataProductos;
    }




  
  
  //Servicios Krud
RemoveProducto(event): void {
  this.http
 .post<any>(`${config.basePath}product-property/deleteProduct`, {  
})
console.log(event);
//.subscribe();

}

UpdateProducto(event) {
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


InsertProducto(event) {
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

}

