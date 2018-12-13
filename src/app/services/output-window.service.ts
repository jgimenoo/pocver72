import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
//import { LocalDataSource } from '../intro-window/intro-window.component';

@Injectable()
export class OutputWindowService {

  constructor(private http: HttpClient) { }
  data = [{
    idProducto:"Ron",
    balda:3,
    orden:2,
    apilamiento:2,
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
      idProducto: event.idProducto,
      balda: event.balda,
      orden: event.orden,
      apilamiento: event.apilamiento,
    })
    .subscribe();
}

addOutput(event) {
  this.http
    .post<any>(`${config.basePath}output-window/addOutput`, {
      idProducto: event.idProducto,
      balda: event.balda,
      orden: event.orden,
      apilamiento: event.apilamiento,
    })
    .subscribe();
  }
}