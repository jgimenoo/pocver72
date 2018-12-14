import { Directive, HostBinding, HostListener, Output, EventEmitter, 
  AfterViewInit, ContentChild, Renderer2, ElementRef } from '@angular/core';
import { DraggableHandleDirective } from './draggable-handle.directive';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit {

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;
  @ContentChild('handle') handle: DraggableHandleDirective;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  constructor(
    protected renderer: Renderer2,
    public element: ElementRef) { }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (this.establecerLimitesHandle(event.clientX, event.clientY)) {
      this.dragging = true;
      event.stopPropagation(); // Para que un elemento no mueva el elemento contenedor tambien draggable
      this.dragStart.emit(event);
    } else {
      return;
    }

  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.emit(event);
  }

ngAfterViewInit(): void {
  if (this.handle) {
    this.renderer.removeClass(this.element.nativeElement, 'draggable');

  }
}

establecerLimitesHandle(x, y) {
  if (this.handle) {
    const handleRect: ClientRect = this.handle.element.nativeElement.getBoundingClientRect();
    return (x > handleRect.left && x < handleRect.right && y > handleRect.top && y < handleRect.bottom);
  } else {
    return true;
  }
}

}
