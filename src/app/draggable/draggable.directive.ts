import { Directive, HostBinding, HostListener, Output, EventEmitter, 
  AfterViewInit, ContentChild, Renderer2, ElementRef } from '@angular/core';
import { DraggableHandleDirective } from './draggable-handle.directive';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit {

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;
  @ContentChild('handle') handle: DraggableHandleDirective;

  @Output() dragStart = new EventEmitter<MouseEvent | TouchEvent>();
  @Output() dragMove = new EventEmitter<MouseEvent | TouchEvent>();
  @Output() dragEnd = new EventEmitter<MouseEvent | TouchEvent>();

  constructor(
    protected renderer: Renderer2,
    public element: ElementRef,
    protected device: DeviceDetectorService) { }

  @HostListener('mousedown', ['$event'])
  onPointerDown(event: MouseEvent): void {
    if (this.device.isDesktop() && this.establecerLimitesHandle(event.clientX, event.clientY)) {
      this.dragging = true;
      event.stopPropagation(); // Para que un elemento no mueva el elemento contenedor tambien draggable
      this.dragStart.emit(event);
    } else {
      return;
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (this.establecerLimitesHandle(event.touches[0].clientX, event.touches[0].clientY)) {
      this.dragging = true;
      event.stopPropagation(); // Para que un elemento no mueva el elemento contenedor tambien draggable
      this.dragStart.emit(event);
    } else {
      return;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    if (!this.device.isDesktop() || !this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }

  @HostListener('document:mouseup', ['$event'])
  onPointerUp(event: MouseEvent): void {
    if (!this.device.isDesktop() || !this.dragging) {
      return;
    }
    console.log(event.clientX);
    this.dragging = false;
    this.dragEnd.emit(event);
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
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
