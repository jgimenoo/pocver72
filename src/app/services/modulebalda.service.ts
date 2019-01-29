import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModulebaldaService {

  constructor(private http: HttpClient) { }

  databaldas = [
    {
      IDBalda: "1",      
      Modulo: "1"
            },
    {
      IDBalda: "2",      
      Modulo: "1"
            },
    {
      IDBalda: "3",      
      Modulo: "1"
            },   
    {
      IDBalda: "4",      
      Modulo: "1"
            }, 
  ]

  datamodulos=[
    {
      IDModulo: "1",               // id del lineal
      NLineal: "1",   // nombre de la seccion
      Orden: "1"       //Zona en la que se encuentra la seccion
     },
     {
      IDModulo: "2",               // id del lineal
      NLineal: "1",   // nombre de la seccion
      Orden: "2"       //Zona en la que se encuentra la seccion
    },
  ]
  getdatamodulos(){
    return this.datamodulos
  }
  getdatabaldas(){
    return this.databaldas
  }

  editModuloFeature(event) {
    this.http
      .post<any>(`${config.basePath}modulebalda/editModulofeat`, {
        IDModulo: event.IDModulo,     
        NLineal: event.NLineal,
        Orden: event.Orden
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
