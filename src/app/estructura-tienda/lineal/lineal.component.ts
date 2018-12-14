import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MovableDirective } from '../../draggable/movable.directive';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit, AfterViewInit {

  @Input('datos') datos;
  @Output('linealSinModulos') linealSinModulos = new EventEmitter<any>();

  @ViewChild('clineal') public movable: MovableDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      if(event.previousContainer.data.length === 0){
        this.linealSinModulos.emit();
      }
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
