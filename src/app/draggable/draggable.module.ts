import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MovableDirective } from './movable.directive';
import { DraggableHandleDirective } from './draggable-handle.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DraggableDirective,
    MovableDirective,
    DraggableHandleDirective],
  exports: [
    DraggableDirective,
    MovableDirective,
    DraggableHandleDirective]
})
export class DraggableModule { }
