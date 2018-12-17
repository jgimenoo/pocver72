import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray, CdkDragExit } from '@angular/cdk/drag-drop';
import { MovableDirective } from '../../draggable/movable.directive';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit, AfterViewInit {

  @Input() datos;
  @Output() linealSinModulos = new EventEmitter<any>();

  @ViewChild('clineal') public movable: MovableDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  drop(event: CdkDragDrop<any[]>) {
    const idZona = event.previousContainer.data[0].zona;
    const idLineal = event.previousContainer.data[0].lineal;
    const idLinealNuevo = event.container.data[0].lineal;
    const idZonaNueva = event.container.data[0].zona;
    if (event.previousContainer !== event.container) {
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].lineal = idLinealNuevo;
      event.container.data[event.currentIndex].zona = idZonaNueva;
      if (event.previousContainer.data.length === 0) {
        this.linealSinModulos.emit({idZona: idZona, idLineal: idLineal});
      }
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
