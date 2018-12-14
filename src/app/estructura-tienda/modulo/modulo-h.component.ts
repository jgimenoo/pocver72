import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ModuloComponent } from './modulo.component';

@Component({
  selector: 'app-modulo-hor',
  templateUrl: './modulo-h.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloHComponent extends ModuloComponent implements OnInit {

  constructor(protected elem: ElementRef, protected renderer: Renderer2) {
    super(elem, renderer);
    this.esHorizontal = true;
   }

}
