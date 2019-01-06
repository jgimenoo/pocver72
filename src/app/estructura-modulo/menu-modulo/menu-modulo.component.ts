import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu-modulo',
  templateUrl: './menu-modulo.component.html',
  styleUrls: ['./menu-modulo.component.scss']
})
export class MenuModuloComponent implements OnInit, AfterViewInit  {

  @Output() rotarModulo = new EventEmitter<any>();
  @Output() zoomModulo = new EventEmitter<any>();

  giroX = 0;
  giroY = 0;

  escala = 1;

  constructor() { }

  ngOnInit() {
  }

  _rotarModulo(direccion: string) {
    if (direccion === 'arriba') {
      this.giroX += 90;
    } else if (direccion === 'abajo') {
      this.giroX -= 90;
    } else if (direccion === 'izquierda') {
      this.giroY += 90;
    } else {
      this.giroY -= 90;
    }
    this.rotarModulo.emit({x: this.giroX, y: this.giroY});
  }

  _zoomModulo(tipo){
    if (tipo === 'aumentar') {
      this.escala += 0.2;
    } else {
      this.escala -= 0.2;
    }
    if (this.escala <= 0) {
      this.escala = 1;
    }
    this.zoomModulo.emit(this.escala);
  }
  
  ngAfterViewInit() {


  }

}
