import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { getOrCreateNodeInjector } from '@angular/core/src/render3/di';

@Injectable({
  providedIn: 'root'
})
export class ModulebaldaService {

  constructor(private http: HttpClient) { }

  databaldas = [
    {
      cod_balda: "1",      
      modulo: "1"
            },
    {
      cod_balda: "2",      
      modulo: "1"
            },
    {
      cod_balda: "3",      
      modulo: "1"
            },   
    {
      cod_balda: "4",      
      modulo: "1"
            }, 
  ]

  datamodulos=[
    {
      cod_modulo: "1",            
      cod_lineal: "1", 
      cod_seccion: "1",  
      seccion: "Perfumeria",
      orden: "2"
     },
     {
      cod_modulo: "2",            
      cod_lineal: "2",   
      cod_seccion: "1",
      seccion: "Horno",
      orden: "1"
    },
  ]

  secciones=[
    {value: 'Perfumeria', title: 'Perfumeria'},
    {value: 'Alcoholes', title: 'Alcoholes'},
    {value: 'Horno', title: 'Horno'},
    {value: 'Pescado', title: 'Pescado'}, 
    {value: 'Fruta y verdura', title: 'Fruta y verdura'},
    {value: 'Carne', title: 'Carne'},
  ]
  getSectionm(){
    return this.secciones;
  }
  orden=[
    {value: '1', title: '1'},
    {value: '2', title: '2'},
    {value: '3', title: '3'},
  ]
  getOrden(){
    return this.orden
  }
  getdatamodulos(){
    return this.datamodulos
  }
  getdatabaldas(){
    return this.databaldas
  }


  deleteModuloFeature(event): void {
    this.http
   .post<any>(`${config.basePath}modulebalda/deleteModulofeat`, {  
  })
  console.log(event);
  }

  editModuloFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/editModulofeat`, {
        cod_modulo: event.cod_modulo,     
        cod_lineal: event.cod_lineal,
        cod_seccion:event.cod_seccion,
        seccion: event.seccion,
        orden: event.orden
      })
      .subscribe();
  }

  addModuloFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/addModulofeat`, {
        cod_modulo: event.cod_modulo,     
        cod_lineal: event.cod_lineal,
        cod_seccion:event.cod_seccion,
        seccion: event.seccion,
        orden: event.orden
      })
      .subscribe();
  }

  deleteBaldaFeature(event): void {
    this.http
   .post<any>(`${config.basePath}modulebalda/deleteBaldafeat`, {  
  })
  console.log(event);
  }

  editBaldaFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/editBaldafeat`, {
        cod_balda: event.cod_balda,     
        modulo: event.modulo,
      })
      .subscribe();
  }

  addBaldaFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/addBaldafeat`, {
        cod_balda: event.cod_balda,     
        modulo: event.modulo,
      })
      .subscribe();
  }
}
