import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ModuloComponent } from './modulo.component';

@Component({
  selector: 'app-modulo-hor',
  templateUrl: './modulo-h.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloHComponent extends ModuloComponent implements OnInit {

  constructor(public element: ElementRef, protected renderer: Renderer2) {
    super(element, renderer);
    this.esHorizontal = true;
   }

}
