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
      idProduct: "1",                // id del producto
      productname: "Ron",            // nombre del producto
      stock:"20",                    // unidades totales del producto
      almacenaje: "Pale",            // pale, medio pale o caja
      tipolineal: "Refrigerado",     // lineal refrigerado o no
      apilamiento:"Horizontal",      // tipo de apilamiento, horizontal o vertical
      facingmin: "2",                // facing minimo del producto(cantidad que el usuario ve de primeras)
          },
    {
      idProduct: "2",                // id del producto
      productname: "Ginebra",        // nombre del producto
      stock:"30",                    // unidades totales del producto
      almacenaje: "Medio-Pale",      // pale, medio pale o caja
      tipolineal: "No Refrigerado",  // lineal refrigerado o no
      apilamiento:"Horizontal",      // tipo de apilamiento, horizontal o vertical
      facingmin: "3",                // facing minimo del producto(cantidad que el usuario ve de primeras)
    }
  ];
  tipolineal=[
    {value: 'R', title: 'Refrigerado'},
    {value: 'NR', title: 'No Refrigerado'},
  ]
  apilamiento=[
    {value: 'H', title: 'Horizontal'},
    {value: 'V', title: 'Vertical'},
    {value: 'N/A', title: 'No Importa'},
  ]
  almacenaje=[
    {value: 'P', title: 'Pale'},
    {value: 'MP', title: 'Medio-Pale'},
    {value: 'C', title: 'Caja'},
  ]

  getTipo(){
    return this.tipolineal;
  }
  getLineal(){
    return this.almacenaje;
  }
  getAlmacen(){
    return this.apilamiento;
  }
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
        idProduct: event.idProduct,
        productname: event.productname,
        stock: event.stock,
        almacenaje: event.almacenaje,
        tipolineal: event.tipolineal,
        apilamiento: event.apilamiento,
        facingmin: event.facingmin,
      })
      .subscribe();
  }
  
  addEProduct(event) {
    this.http
      .post<any>(`${config.basePath}product-expo/addEProduct`, {
        idProduct: event.idProduct,
        productname: event.productname,
        stock: event.stock,
        almacenaje: event.almacenaje,
        tipolineal: event.tipolineal,
        apilamiento: event.apilamiento,
        facingmin: event.facingmin,
      })
      .subscribe();
    }
    getProduct() {
      return this.product;
    }


}
