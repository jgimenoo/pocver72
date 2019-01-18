import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
//import { LocalDataSource } from '../intro-window/intro-window.component';

@Injectable()
export class OutputWindowService {

  constructor(private http: HttpClient) { }
  data = [{
idProduct:"1",
productname:"Ron",
unidades:"25",
modulo:"2",
balda:"3",
seccion:"1",
area:"7054"
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
      idProduct:event.idProduct,
      productname:event.productname,
      unidades:event.unidades,
      modulo:event.modulo,
      balda:event.balda,
      seccion:event.seccion,
      area:event.area
    })
    .subscribe();
}

addOutput(event) {
  this.http
    .post<any>(`${config.basePath}output-window/addOutput`, {
      idProduct:event.idProduct,
      productname:event.productname,
      unidades:event.unidades,
      modulo:event.modulo,
      balda:event.balda,
      seccion:event.seccion,
      area:event.area
    })
    .subscribe();
  }
}