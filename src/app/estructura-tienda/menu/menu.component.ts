import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit,
   OnChanges, SimpleChanges } from '@angular/core';
   import { NbSelectComponent } from '@nebular/theme/components/select/select.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data;

  @Output() botonModulo = new EventEmitter<any>();
  @ViewChild('selectZona') selZona: NbSelectComponent<any>;

  idZona = 1;
  idSeccion = 1;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.data) {
      this.colorearModulos(1);
    }
  }

  copiarModulo(horizontal: boolean, event: any) {
      this.botonModulo.emit({horizontal: horizontal, idZona: this.idZona, idSeccion: this.idSeccion});
  }

  colorearModulos(idSeccion){
    if (this.data.secciones && this.data.secciones[idSeccion - 1]) {
      this.data.moduloH[0].color = this.data.secciones[idSeccion - 1].color;
      this.data.moduloV[0].color = this.data.secciones[idSeccion - 1].color;
    }
  }

}
