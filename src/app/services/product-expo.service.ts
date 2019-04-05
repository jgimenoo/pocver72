import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductExpoService {
  product: any[] = [];
  constructor(private http: HttpClient) { }
  dataproducts = [
    {
      cod_prod: "1",                // id del producto
      descripcion: "Ron",           // nombre del producto
      facing_min:"2",               // facing minimo del producto(cantidad que el usuario ve de primeras)
      prev_ventas: "200", 
      variable_logistica_exp: "2",           
      alto_exp: "30",     
      ancho_exp:"5",      
      largo_exp: "10",              
      area_exp: "300",
      volumen_exp: "2000",
      cant_alm_form_exp: "50"
          },
    {
      cod_prod: "2",                // id del producto
      descripcion: "Ginebra",       // nombre del producto
      facing_min:"3",               // facing minimo del producto(cantidad que el usuario ve de primeras)
      prev_ventas: "250", 
      variable_logistica_exp: "3",           
      alto_exp: "40",     
      ancho_exp:"5",    
      largo_exp: "10",              
      area_exp: "400",
      volumen_exp: "2000", 
      cant_alm_form_exp: "40"             
    }
  ];

  getDataEProducts() {
    return this.dataproducts;
  }

  deleteEProduct(event): void {
    this.http
   .post<any>(`${config.basePath}product-expo/deleteEProduct`, {  
  })
  console.log(event);
  
  }
  
  editEProduct(event) {
    this.http
      .post<any>(`${config.basePath}product-expo/editEProduct`, {
        cod_prod: event.cod_prod,
        descripcion: event.descripcion,
        facing_min: event.facing_min,
        cant_alm_form_exp: event.cant_alm_form_exp,
        prev_ventas: event.prev_ventas,
        variable_logistica_exp: event.variable_logistica_exp,
        alto_exp: event.alto_exp,
        ancho_exp: event.ancho_exp,
        largo_exp: event.largo_exp,
        area_exp: event.area.exp,
        volumen_exp:event.volumen_exp,

      })
      .subscribe();
  }
  
  addEProduct(event) {
    this.http
      .post<any>(`${config.basePath}product-expo/addEProduct`, {
        cod_prod: event.cod_prod,
        descripcion: event.descripcion,
        facing_min: event.facing_min,
        cant_alm_form_exp: event.cant_alm_form_exp,
        prev_ventas: event.prev_ventas,
        variable_logistica_exp: event.variable_logistica_exp,
        alto_exp: event.alto_exp,
        ancho_exp: event.ancho_exp,
        largo_exp: event.largo_exp,
        area_exp: event.area.exp,
        volumen_exp:event.volumen_exp,
      })
      .subscribe();
    }
    getProduct() {
      return this.product;
    }


}
