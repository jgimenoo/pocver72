import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShopsserviceService {
  shop: any[] = [];
  constructor(private http: HttpClient) { }

  datashops = [
    {
      zona: "Cerca",     // nombre del producto
      seccion: "Carne",              // pale, medio pale o caja
      linealtipo:"normal",
      moduloancho: "50",            // ancho x alto x largo
      modulolargo: "50",         // ancho del producto
      moduloalto: "50",           // alto del producto
      numpales:"10",          // largo del producto
    },  
    {
      zona: "Medio",     
      seccion: "Pescado",             
      linealtipo:"refrigerado",
      moduloancho: "50",          
      modulolargo: "60",     
      moduloalto: "70",    
      numpales:"4",   
    }];


    seccion = [
      {value: '1', title: 'Perfumeria'},
      {value: '2', title: 'Alcoholes'},
      {value: '3', title: 'Horno'},
      {value: '4', title: 'Pescado'},
      {value: '5', title: 'Fruta y verdura'},
      {value: '6', title: 'Carne'},
      ];

    lineal = [
    {value: '1', title: 'Normal'},
    {value: '2', title: 'Refrigerado'},
     ];

   zona = [
    {value: '1', title: 'Cerca'},
    {value: '2', title: 'Media'},
    {value: '3', title: 'Lejos'},
   ];
  
  getDataShops() {
    return this.datashops;
  }
  getSeccion() {
    return this.seccion;
  }
  getZona(){
    return this.zona;
  }
  getLineal(){
    return this.lineal;
  }

  deleteShop(event): void {
    this.http
   .post<any>(`${config.basePath}products/deleteShop`, {  
  })
  console.log(event);
  }
  
  editShop(event) {
    this.http
      .post<any>(`${config.basePath}products/editShop`, {
        zona: event.zona,
        seccion: event.seccion,
        linealtipo: event.linealtipo,
        moduloancho: event.moduloancho,
        modulolargo: event.modulolargo,
        moduloalto: event.moduloalto,
        numpales: event.numpales,
      })
      .subscribe();
  }
  
  addShop(event) {
    this.http
      .post<any>(`${config.basePath}products/addShop`, {
        zona: event.zona,
        seccion: event.seccion,
        linealtipo: event.linealtipo,
        moduloancho: event.moduloancho,
        modulolargo: event.modulolargo,
        moduloalto: event.moduloalto,
        numpales: event.numpales,
      })
      .subscribe();
  }

  getShop() {
    return this.shop;
  }

}
