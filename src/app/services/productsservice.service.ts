import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsserviceService {
  product: any[] = [];

  constructor(private http: HttpClient) { }

  seccion2 = [
    {code: 'Perfumeria', title: 'Perfumeria',value:54},
    {code: 'Alcoholes', title: 'Alcoholes',value:58},
    {code: 'Horno', title: 'Horno',value:25},
    {code: 'Pescado', title: 'Pescado',value:42},
    {code: 'Fruta y verdura', title: 'Fruta y verdura',value:54},
    {code: 'Carne', title: 'Carne',value:44},
  ];


  dataSeccion2: any[] = [{data: [54, 58, 25, 42, 54, 44], label: 'Cantidad de productos por seccion'}];
  labelsSeccion2: any = new Array();

getDataBarChart() {
  for (let seccion of this.seccion2) {
    this.dataSeccion2.push(seccion.value);
    this.labelsSeccion2.push(seccion.title);
  }
}
getDataSeccion2(){ 
  return this.dataSeccion2;
}
  getProduct() {
    return this.product;
  }
}