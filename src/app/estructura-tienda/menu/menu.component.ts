import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() data;

  @Output() botonModulo = new EventEmitter<any>();

  idZona;
  idSeccion;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.idZona = 1;
    this.idSeccion = 1;
    this.colorearModulos(1);
  }

  copiarModulo(horizontal: boolean, event: any) {
      this.botonModulo.emit({horizontal: horizontal, idZona: this.idZona, idSeccion: this.idSeccion});
  }

  colorearModulos(idSeccion){
    this.data.moduloH[0].color = this.data.secciones[idSeccion - 1].color;
    this.data.moduloV[0].color = this.data.secciones[idSeccion - 1].color;
  }

}
