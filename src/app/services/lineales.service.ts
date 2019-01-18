import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinealesService {

  constructor(private http: HttpClient) { }

  opcionesrefrigerado=[
    {value: 'S', title: 'Si'},
    {value: 'N', title: 'No'},
  ]
  seccionesl=[
    {value: 'Perfumeria', title: 'Perfumeria'},
    {value: 'Alcoholes', title: 'Alcoholes'},
    {value: 'Horno', title: 'Horno'},
    {value: 'Pescado', title: 'Pescado'}, 
    {value: 'Fruta y verdura', title: 'Fruta y verdura'},
    {value: 'Carne', title: 'Carne'},
  ]

  valores=[
    {value: 'Ancho Módulo(cm)', title: 'Ancho Módulo(cm)'},
    {value: 'Largo Módulo(cm)', title: 'Largo Módulo(cm)'},
    {value: 'Alto Módulo(cm)', title: 'Alto Módulo(cm)'},
    {value: 'Ancho Balda(cm)', title: 'Ancho Balda(cm)'}, 
    {value: 'Largo Balda(cm)', title: 'Largo Balda(cm)'},
    {value: 'Alto Balda(cm)', title: 'Alto Balda(cm)'},
    {value: 'Ancho Tienda(m)', title: 'Ancho Tienda(m)'},
    {value: 'Largo Tienda(m)', title: 'Largo Tienda(m)'},
    {value: '1 Lineal', title: '1 Lineal'},
    {value: '1 Módulo', title: '1 Módulo'},
  ]
  titulos=[
    {value: '120', title: '120'},
    {value: '40', title: '40'},
    {value: '180', title: '180'},
    {value: '120', title: '120'}, 
    {value: '35', title: '35'},
    {value: '34', title: '34'},
    {value: '50', title: '50'},
    {value: '70', title: '70'},
    {value: '3 modulos', title: '3 modulos'},
    {value: '5 baldas', title: '5 baldas'}, 
  ]
  datalineales=[
    {
      NLineal: "1",               // id del lineal
      Seccionlin: "Perfumeria",   // nombre de la seccion
      Refrigerado: "No"       //Zona en la que se encuentra la seccion
     },
     {
      NLineal: "2",               // id del lineal
      Seccionlin: "Alcoholes",   // nombre de la seccion
      Refrigerado: "No"       //Zona en la que se encuentra la seccion
    },
  ]

  getdatalineales(){
    return this.datalineales
  }
  getseccion0(){
    return this.opcionesrefrigerado
  }
  getlinealsino() {
    return this.seccionesl;
  }

  getdatavalores(){ 
    return this.valores
  }
  getdatatitle(){
    return this.titulos
  }

  deleteLinealFeature(event): void {
    this.http
   .post<any>(`${config.basePath}lineales/deleteLinealfeat`, {  
  })
  console.log(event);
  }
  
  editLinealFeature(event) {
    this.http
      .post<any>(`${config.basePath}lineales/editLinealfeat`, {
        NLineal: event.NLineal,     
        Seccionlin: event.Seccionlin,
        Refrigerado: event.Refrigerado
      })
      .subscribe();
  }
  
  addLinealFeature(event) {
    this.http
      .post<any>(`${config.basePath}lineales/addLinealfeat`, {
        NLineal: event.NLineal,     
        Seccionlin: event.Seccionlin,
        Refrigerado: event.Refrigerado
      })
      .subscribe();
  }





}
