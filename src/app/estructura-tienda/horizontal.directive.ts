import { Directive, HostBinding, OnInit, OnChanges, SimpleChanges, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHorizontal]'
})
export class HorizontalDirective implements OnInit, OnChanges {

  // @HostBinding('class.hbox') public horizontal = true;
  @Input() appHorizontal: boolean;

  constructor(private elem: ElementRef, private renderer: Renderer2){
  }

  ngOnChanges(changes: SimpleChanges) {
    const cambio = changes.appHorizontal.currentValue;
    if ( cambio === '' ) {
      this.appHorizontal = true;
    } else {
      this.appHorizontal = JSON.parse(changes.appHorizontal.currentValue);
    }
    this.renderer.removeClass(this.elem.nativeElement, 'hbox');
    this.renderer.removeClass(this.elem.nativeElement, 'vbox');
    if ( this.appHorizontal ){
      this.renderer.addClass(this.elem.nativeElement, 'hbox');
    } else {
      this.renderer.addClass(this.elem.nativeElement, 'vbox');
    }
  }

  ngOnInit() { }



}
