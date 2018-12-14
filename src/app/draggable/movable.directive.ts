import { Directive, HostListener, HostBinding, Input, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]',
  exportAs: 'appMovable'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = true;

  private _startPosition: Position;

  public get startPosition(): Position {
    return this._startPosition;
  }

  @Input()
  public set startPosition(value: Position) {
    this._startPosition = value;
    this.position = value;
  }

  public position: Position = {x: 0, y: 0};

  // tslint:disable-next-line:no-input-rename
  @Input('appMovableReset') public reset = false;


  constructor(
    private sanitizer: DomSanitizer,
    protected renderer: Renderer2,
    public element: ElementRef){
      super(renderer, element);
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this._startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this._startPosition.x;
    this.position.y = event.clientY - this._startPosition.y;
    console.log(this.position);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.reset) {
      this.position = {x: 0, y: 0};
    }
  }

}
