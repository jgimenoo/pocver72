import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit, OnChanges {

  public esHorizontal: boolean;
  private _size: number;

  @Input() size = '1';
  @Input() label = '';
  @Input() color = '#BBBBBB';
  @Input() id = 0;
  @Input() ancho = false;

  constructor(public element: ElementRef, protected renderer: Renderer2) {
    this.esHorizontal = false;
   }

  ngOnInit() {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    const htmlelem = this.element.nativeElement.children[0];
    if (changes.size) {
      const _size = parseInt(changes.size.currentValue, 10);
      this.renderer.removeClass(htmlelem, 'small');
      this.renderer.removeClass(htmlelem, 'large');
      if ( _size === 0) {
        this.renderer.addClass(htmlelem, 'small');
      } else if ( _size === 2 ) {
        this.renderer.addClass(htmlelem, 'large');
      }
      this._size = _size;
    }
    if (changes.label) {
      this.label = changes.label.currentValue;
    }
    if (changes.ancho) {
      const doWide = changes.ancho.currentValue;
      if (doWide) {
        this.renderer.addClass(htmlelem, 'wide');
      } else {
        this.renderer.removeClass(htmlelem, 'wide');
      }     
    }
  }

}
