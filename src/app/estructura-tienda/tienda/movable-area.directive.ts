import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef, HostListener } from '@angular/core';
import { MovableDirective } from '../../draggable/movable.directive';
import { Subscription } from 'rxjs';
import { LinealComponent } from '../lineal/lineal.component';
import { AlmacenComponent } from '../almacen/almacen.component';

interface Boundaries{
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]',
  exportAs: 'appMovableArea'
})
export class MovableAreaDirective implements AfterContentInit {
  @ContentChildren(AlmacenComponent, {descendants: true}) almacenes: QueryList<AlmacenComponent>;
  @ContentChildren(LinealComponent, {descendants: true}) lineales: QueryList<LinealComponent>;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public element: ElementRef) { }

  private boundaries: Boundaries;
  private subscriptionsAlmacen: Subscription[] = [];
  private subscriptionsLineal: Subscription[] = [];

  ngAfterContentInit(): void {
    // Para actualizar las cajas que se creen despues
    this.almacenes.changes.subscribe(() => {
      // Lo de agregar subscriptions es para evitar llamar a los metodos cada vez que existan cambios
      this.subscriptionsAlmacen.forEach(s => s.unsubscribe());
      this.almacenes.forEach(almacen => {
        this.subscriptionsAlmacen.push(almacen.movable.dragStart.subscribe(() => this.establecerLimitesArea(almacen.movable)));
        this.subscriptionsAlmacen.push(almacen.movable.dragMove.subscribe(() => this.controlarLimitesArea(almacen.movable)));
      });

    });
    this.almacenes.notifyOnChanges(); // Para que salte el onchange al inicializar la vista

    // Para actualizar las cajas que se creen despues
    this.lineales.changes.subscribe(() => {
      // Lo de agregar subscriptions es para evitar llamar a los metodos cada vez que existan cambios
      this.subscriptionsLineal.forEach(s => s.unsubscribe());
      this.lineales.forEach(lineal => {
        this.subscriptionsLineal.push(lineal.movable.dragStart.subscribe(() => this.establecerLimitesArea(lineal.movable)));
        this.subscriptionsLineal.push(lineal.movable.dragMove.subscribe(() => this.controlarLimitesArea(lineal.movable)));
      });
    });
    this.lineales.notifyOnChanges(); // Para que salte el onchange al inicializar la vista
  }

  establecerLimitesArea(movable: MovableDirective) {
    const areaRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();
    this.boundaries = {
      minX: areaRect.left - movableRect.left + movable.position.x,
      maxX: areaRect.right - movableRect.right + movable.position.x,
      minY: areaRect.top - movableRect.top + movable.position.y,
      maxY: areaRect.bottom - movableRect.bottom + movable.position.y
    }
    console.log(areaRect);
    console.log(movableRect);
    console.log(this.boundaries);
  };

  controlarLimitesArea(movable: MovableDirective) {
    movable.position.x = Math.max( this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min( this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max( this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min( this.boundaries.maxY, movable.position.y);
  }

}
