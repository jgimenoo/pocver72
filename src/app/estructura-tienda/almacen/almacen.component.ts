import { Component, OnInit, ViewChild, Input, Renderer2, AfterViewInit, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
import { MovableDirective } from '../../draggable/movable.directive';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit, AfterViewInit, OnChanges  {

  @Input() datos;

  /** Acceso al componente drag and drop */
  @ViewChild('calmacen') public movable: MovableDirective;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datos) {
      const _size = parseInt(changes.datos.currentValue.size, 10);
      const htmlelem = this.elem.nativeElement.children[0];
      this.renderer.removeClass(htmlelem, 'small');
      this.renderer.removeClass(htmlelem, 'large');
      if ( _size === 0) {
        this.renderer.addClass(htmlelem, 'small');
      } else if ( _size === 2 ) {
        this.renderer.addClass(htmlelem, 'large');
      }
    }
  }
}
