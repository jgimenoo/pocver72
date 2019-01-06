import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modulo-visual',
  templateUrl: './modulo-visual.component.html',
  styleUrls: ['./modulo-visual.component.scss']
})
export class ModuloVisualComponent implements OnInit {

  @Input() modulo;
  @Input() numBaldas;
  @Input() datosBalda;
  @Input() grupoProductos;

  constructor() { }

  ngOnInit() {
    this.datosBalda.alto = (this.modulo.alto / this.numBaldas); 
    for ( let aux = 0; aux < this.numBaldas; aux++) {
      this.datosBalda.baldas.push({
        num: aux + 1,
        posXProductos: 0
      });
    }
  }

}
