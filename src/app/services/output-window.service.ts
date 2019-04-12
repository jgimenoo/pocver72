import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
//import { LocalDataSource } from '../intro-window/intro-window.component';

@Injectable()
export class OutputWindowService {

  constructor(private http: HttpClient) { }
  data = [{
cod_producto:"1",
descripcion:"Ron",
unidades_producto:"25",
lineal:"3",
modulo:"2",
balda:"3",
seccion:"1",
cantidad_alto:"2",
cantidad_ancho:"2",
cantidad_largo:"2",
area_ocupada:"7054"
  }];

  getDataOutput() {
    return this.data;
  }


deleteOutput(event): void {
  this.http
 .post<any>(`${config.basePath}output-window/deleteOutput`, {  
})
console.log(event);

}

editOutput(event) {
  this.http
    .post<any>(`${config.basePath}output-window/editOutput`, {
      cod_producto:event.cod_producto,
      descripcion:event.descripcion,
      unidades_producto:event.unidades_producto,
      lineal:event.lineal,
      modulo:event.modulo,
      balda:event.balda,
      seccion:event.seccion,
      cantidad_alto:event.cantidad_alto,
      cantidad_ancho:event.cantidad_ancho,
      cantidad_largo:event.cantidad_largo,
      area_ocupada:event.area_ocupada
    })
    .subscribe();
}

addOutput(event) {
  this.http
    .post<any>(`${config.basePath}output-window/addOutput`, {
      cod_producto:event.cod_producto,
      descripcion:event.descripcion,
      unidades_producto:event.unidades_producto,
      lineal:event.lineal,
      modulo:event.modulo,
      balda:event.balda,
      seccion:event.seccion,
      cantidad_alto:event.cantidad_alto,
      cantidad_ancho:event.cantidad_ancho,
      cantidad_largo:event.cantidad_largo,
      area_ocupada:event.area_ocupada
    })
    .subscribe();
  }
}