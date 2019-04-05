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
  zonasl=[
    {value: 'Zona 1', title: 'Zona 1'},
    {value: 'Zona 2', title: 'Zona 2'},
    {value: 'Zona 3', title: 'Zona 3'},
    {value: 'Zona 4', title: 'Zona 4'}, 
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
      Componente: "1 Módulo No Refrigerado",      
      Valor: "5 Baldas"
        }, 
  {
      Componente: "1 Módulo Refrigerado",      
      Valor: "4 Baldas"
        },
  {
      Componente: "Caja",      
      Valor: "0"
       },
  {
      Componente: "Palet",      
      Valor: "1"
      },
  {
      Componente: "Medio-Palet",      
      Valor: "2"
      },
  {
      Componente: "Unidad",      
      Valor: "3"
     },

]

  datalineales=[
    {
      cod_lineal: "1",  
      cod_zona: "1",    
      descripcion: "Zona 1",
      refrigerado: "Si" 
     },
     {
      cod_lineal: "2",  
      cod_zona: "2",    
      descripcion: "Zona 2",
      refrigerado: "Si" 
    },
  ]

  getdatalineales(){
    return this.datalineales
  }
  getzona0(){
    return this.zonasl
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
        cod_lineal: event.cod_lineal,     
        cod_zona: event.cod_zona,
        descripcion: event.descripcion,
        refrigerado: event.refrigerado
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
