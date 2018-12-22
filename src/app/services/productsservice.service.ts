import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsserviceService {
  product: any[] = [];

  constructor(private http: HttpClient) { }
  dataproducts = [
    {
      idProduct: "Ron",     // nombre del producto
      format: "Pale",              // pale, medio pale o caja
      seccion:"Alcohol",
      volumentotal: "500",         // ancho x alto x largo
      anchoproducto: "10",         // ancho del producto
      altoproducto: "5",           // alto del producto
      largoproducto:"10",          // largo del producto
      stock:"360",                 // cantidad total del producto
      facing:"80",                 // facing total 
    },  
    {
    idProduct: "Calamares",        
    format: "Pale", 
    seccion:"Pescado",                
    volumentotal: "500",               
    anchoproducto: "90",                   
    altoproducto: "60",           
    largoproducto:"90",          
    stock:"1",                 
    facing:"80", 

    },
    {
      idProduct: "Ginebra",        
      format: "Mediopale", 
      seccion:"Alcohol",                
      volumentotal: "800",               
      anchoproducto: "90",                   
      altoproducto: "60",           
      largoproducto:"90",          
      stock:"1",                 
      facing:"80", 
  
      }];
   
   format = [
    {value: 'Pale', title: 'Pale'},
    {value: 'Medio Pale', title: 'Medio Pale'},
    {value: 'Caja', title: 'Caja'},
    ];
   seccion = [
    {value: 'Perfumeria', title: 'Perfumeria'},
    {value: 'Alcoholes', title: 'Alcoholes'},
    {value: 'Horno', title: 'Horno'},
    {value: 'Pescado', title: 'Pescado'},
    {value: 'Fruta y verdura', title: 'Fruta y verdura'},
    {value: 'Carne', title: 'Carne'},
  ];

  seccion2 = [
    {code: 'Perfumeria', title: 'Perfumeria',value:54},
    {code: 'Alcoholes', title: 'Alcoholes',value:58},
    {code: 'Horno', title: 'Horno',value:25},
    {code: 'Pescado', title: 'Pescado',value:42},
    {code: 'Fruta y verdura', title: 'Fruta y verdura',value:54},
    {code: 'Carne', title: 'Carne',value:44},
  ];


  dataSeccion2: any[] = [{data: [54, 58, 25, 42, 54, 44], label: 'Cantidad de productos por tipo'}];
  labelsSeccion2: any = new Array();

  dataSeccion3 =  [54, 58, 25, 42, 54, 44];



getDataBarChart() {
  for (let seccion of this.seccion2) {
    this.dataSeccion2.push(seccion.value);
    this.labelsSeccion2.push(seccion.title);
  }
  console.log(this.dataSeccion2);
  console.log(this.labelsSeccion2);
}


getDataSeccion2(){ 
  return this.dataSeccion2;
}
getDataSeccion3(){ 
  return this.dataSeccion3;
}

 getDataProducts() {
  return this.dataproducts;
}
 getSeccion() {
  return this.seccion;
}
 getFormat(){
  return this.format;
}


deleteProduct(event): void {
  this.http
 .post<any>(`${config.basePath}products/deleteProduct`, {  
})
console.log(event);

}

editProduct(event) {
  this.http
    .post<any>(`${config.basePath}products/editProduct`, {
      idProducto: event.idProducto,
      format: event.format,
      seccion: event.seccion,
      volumentotal: event.volumentotal,
      anchoproducto: event.anchoproducto,
      altoproducto: event.altoproducto,
      largoproducto: event.largoproducto,
      stock: event.stock,
      facing: event.facing,
    })
    .subscribe();
}

addProduct(event) {
  this.http
    .post<any>(`${config.basePath}products/addProduct`, {
      idProducto: event.idProducto,
      format: event.format,
      seccion: event.seccion,
      volumentotal: event.volumentotal,
      anchoproducto: event.anchoproducto,
      altoproducto: event.altoproducto,
      largoproducto: event.largoproducto,
      stock: event.stock,
      facing: event.facing,
    })
    .subscribe();
  }
  getProduct() {
    return this.product;
  }
}