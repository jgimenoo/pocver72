import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray, CdkDragExit } from '@angular/cdk/drag-drop';
import { MovableDirective } from '../../draggable/movable.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit, AfterViewInit {

  @Input() datos;
  @Output() linealSinModulos = new EventEmitter<any>();
  @Output() moduloSinMover = new EventEmitter<any>();

  @ViewChild('clineal') public movable: MovableDirective;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  guardarPosicion(clineal){
    this.datos.dd.x = clineal.position.x;
    this.datos.dd.y = clineal.position.y;
  }

  dropped(event: CdkDragDrop<any[]>) {
    const idZona = event.previousContainer.data[0].zona;
    const idLineal = event.previousContainer.data[0].lineal;
    const idLinealNuevo = event.container.data[0].lineal;
    const idZonaNueva = event.container.data[0].zona;
    const horizontalNuevo = event.container.data[0].horizontal;
    if (event.previousContainer !== event.container) {
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].lineal = idLinealNuevo;
      event.container.data[event.currentIndex].zona = idZonaNueva;
      event.container.data[event.currentIndex].horizontal = horizontalNuevo;
      if (event.previousContainer.data.length === 0) {
        this.linealSinModulos.emit({idZona: idZona, idLineal: idLineal});
      }
    } else {
      if (event.previousIndex !== event.currentIndex) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        // Se borra el item si sale del area
        this.moduloSinMover.emit({
          modulosLineal: event.container.data,
          moduloData: event.container.data[event.currentIndex],
          posLineal: event.currentIndex});
      }
    }
  }

  movedModulo(event: any) {
    // Se guarda la posicion del modulo
    event.source.data.dd = {
      x: event.pointerPosition.x,
      y: event.pointerPosition.y
    };
  }

  verProductosModulo(idLineal: number, idModulo: number){
    this.router.navigate(['modulo', idLineal, idModulo, this.datos.refrigerado]);
  }

}
