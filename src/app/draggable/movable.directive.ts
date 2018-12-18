import { Directive, HostListener, HostBinding, Input, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    public element: ElementRef,
    protected device: DeviceDetectorService) {
      super(renderer, element, device);
  }

  @HostListener('dragStart', ['$event'])
  onDragStart = (event: any) => {
    this._startPosition = {
      x: (event.clientX || event.touches[0].clientX) - this.position.x,
      y: (event.clientY || event.touches[0].clientY) - this.position.y
    };
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: any) {
    this.position.x = (event.clientX || event.touches[0].clientX) - this._startPosition.x;
    this.position.y = (event.clientY || event.touches[0].clientY) - this._startPosition.y;
    console.log(this.position);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: any) {
    debugger;
    if (this.reset) {
      this.position = {x: 0, y: 0};
    }
  }

}
