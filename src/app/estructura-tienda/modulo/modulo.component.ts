import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit, OnChanges {

  public esHorizontal: boolean;

  @Input('size') size = '1';
  @Input('label') label = '';
  @Input('color') color = '#BBBBBB';
  @Input('id') id = 0;
  private _size: number;


  constructor(protected elem: ElementRef, protected renderer: Renderer2) {
    this.esHorizontal = false;
   }

  ngOnInit() {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (changes.size) {
      const _size = parseInt(changes.size.currentValue, 10);
      const htmlelem = this.elem.nativeElement.children[0];
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
  }

}
