import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-producto-visual',
  templateUrl: './producto-visual.component.html',
  styleUrls: ['./producto-visual.component.scss']
})
export class ProductoVisualComponent implements OnInit {

  @Input() data: any;  // Por de pronto se usa solo de lectura

  // Medidas de pantalla
  @Input() alto = 0;
  @Input() ancho = 0;
  @Input() largo = 0;
  @Input() labelTop = '';
  @Input() labelFront = '';

  constructor() { }

  ngOnInit() {

  }

}
