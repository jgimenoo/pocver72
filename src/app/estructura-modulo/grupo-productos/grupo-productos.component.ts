import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grupo-productos',
  templateUrl: './grupo-productos.component.html',
  styleUrls: ['./grupo-productos.component.css']
})
export class GrupoProductosComponent implements OnInit{

  @Input() data: any;
  @Input() dataBalda: any;
  @Input() inicioX = 0;  // Posicion desde la que comienza a colocar productos

  private _finalX = 0;
  private proporcion = 3.125;

  separadorProducto = 2;
  separadorProductoAlto = 1;

  constructor() { }

  ngOnInit() {
    this.data.largo = this.data.largoReal * this.proporcion;
    this.data.ancho =  this.data.anchoReal * this.proporcion;
    this.data.alto =  this.data.altoReal * this.proporcion;
    for (let i = 0; i < this.data.cantidad; i++) {
      this.data.productos.push({
        x: 0,
        y: 0,
        z: 0
      });
    }
    const maxProdsLargo = Math.trunc(this.dataBalda.largo / (this.data.largo + this.separadorProducto));
    const maxProdsAlto = Math.trunc(this.dataBalda.alto / (this.data.alto + this.separadorProductoAlto));
    let maxProdsFila;
    let totalFilas;
    let totalColumnas;
    const maxFilas = 1;
    if (this.data.horizontal) {
      // totalFilas = Math.trunc(this.data.productos.length / maxProdsLargo);
      // if ( (this.data.productos.length % maxProdsLargo) > 0) {
      //   totalFilas += 1;
      // }
      totalFilas = maxProdsLargo;
      maxProdsFila = Math.trunc(this.data.productos.length / totalFilas);
      if ( (this.data.productos.length % totalFilas) > 0) {
        maxProdsFila += 1;
      }
      totalColumnas = 1;
    } else {
      totalFilas = 1;
      totalColumnas = Math.trunc(this.data.productos.length / maxProdsAlto);
      if ( (this.data.productos.length % maxProdsAlto) > 0) {
        totalColumnas += 1;
      }
      maxProdsFila = 1;
    }
    let contadorProductos = 0;
    let fila = 1;
    let columna = 1;
    let contadorX = this.inicioX;
    let contadorY = 0;
    let contadorZ = (this.dataBalda.largo / 2) - (this.data.largo / 2);
    this.data.productos.forEach( prod => {
      prod.x = this.separadorProducto + contadorX;
      prod.y = -1 + (this.dataBalda.alto * this.data.balda) - this.data.alto - contadorY;
      prod.z = contadorZ;
      contadorProductos ++;
      if (!this.data.horizontal) {
        if ((contadorProductos % maxProdsAlto) === 0 && !this.data.horizontal) {
          columna ++;
          contadorY = 0;
          contadorZ -= prod.largo + this.separadorProducto;
        } else {
          contadorY += this.data.alto + this.separadorProductoAlto;
        }
      } else {
        if ((contadorProductos % maxProdsFila) === 0 && this.data.horizontal) {
          // Otra fila
          fila ++;
          contadorX = this.inicioX;
          contadorZ -= this.data.largo + this.separadorProducto;
        } else {
          contadorX += this.data.ancho + this.separadorProducto;
        }
      }
    });
    if (!this.data.horizontal) {
      this._finalX = this.inicioX + this.data.ancho + this.separadorProducto;
    } else {
      this._finalX = this.inicioX + ((this.separadorProducto + this.data.ancho) * maxProdsFila);
    }
    this.dataBalda.baldas[this.data.balda - 1].posXProductos = this._finalX;

  }



}
