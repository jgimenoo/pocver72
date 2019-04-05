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
      seccion: "1",
      orden: "2"
     },
     {
      cod_modulo: "2",            
      cod_lineal: "2",   
      seccion: "1",
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

  editModuloFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/editModulofeat`, {
        cod_modulo: event.cod_modulo,     
        cod_lineal: event.cod_lineal,
        seccion: event.seccion,
        orden: event.orden
      })
      .subscribe();
  }
  editBaldaFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/editBaldafeat`, {
        IDBalda: event.IDBalda,     
        Modulo: event.Modulo,
      })
      .subscribe();
  }
}
