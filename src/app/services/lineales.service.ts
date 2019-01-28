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


  datacomponents = [
  {
      Componente: "Ancho Módulo(cm)",      
      Valor: "120"
          },
  {
      Componente: "Largo Módulo(cm)",      
      Valor: "40"
          },
  {
      Componente: "Alto Módulo(cm)",      
      Valor: "180"
          },   
  {
      Componente: "Ancho Balda(cm)",      
      Valor: "120"
          }, 
  {
      Componente: "Largo Balda(cm)",      
      Valor: "35"
         }, 
  {
      Componente: "Alto Balda(cm)",      
      Valor: "34"
        }, 
  {
      Componente: "1 Lineal",      
      Valor: "3 Módulos"
        }, 
  {
      Componente: "1 Módulo",      
      Valor: "5 Baldas"
        }, 
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
    return this.seccionesl
  }
  getlinealsino() {
    return this.opcionesrefrigerado;
  }

  getdatavalores(){ 
    return this.datacomponents
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
