import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Renderer2, AfterViewInit } from '@angular/core';
import { MovableDirective } from '../../draggable/movable.directive';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit, AfterViewInit  {

  @Input('datos') datos;

  /** Acceso al componente drag and drop */
  @ViewChild('calmacen') public movable: MovableDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}
