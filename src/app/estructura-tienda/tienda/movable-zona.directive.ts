import { Directive, ContentChildren, QueryList, ElementRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { AlmacenComponent } from '../almacen/almacen.component';
import { LinealComponent } from '../lineal/lineal.component';
import { Subscription } from 'rxjs';
import { MovableDirective } from '../../draggable/movable.directive';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableZona]',
  exportAs: 'appMovableZona'
})
export class MovableZonaDirective implements AfterContentInit {

  @ContentChildren('cmpalmacen') public almacenes: QueryList<AlmacenComponent>;
  @ContentChildren('cmplineal') public lineales: QueryList<LinealComponent>;

  @Output() cambioZonaAlmacen = new EventEmitter<any>();
  @Output() cambioZonaLineal = new EventEmitter<any>();

  private boundaries: Boundaries;
  private subscriptionsAlmacen: Subscription[] = [];
  private subscriptionsLineal: Subscription[] = [];

  constructor(
    private element: ElementRef) { }

  ngAfterContentInit(): void {
    // Para actualizar las cajas que se creen despues
    this.almacenes.changes.subscribe(() => {
      // Lo de agregar subscriptions es para evitar llamar a los metodos cada vez que existan cambios
      this.subscriptionsAlmacen.forEach(s => s.unsubscribe());
      this.almacenes.forEach(almacen => {
        this.subscriptionsAlmacen.push(almacen.movable.dragStart.subscribe(() => this.establecerLimitesZona(almacen.movable)));
        this.subscriptionsAlmacen.push(almacen.movable.dragEnd.subscribe(() => this.controlarLimitesZonaAlmacen(almacen)));
      });
    });
    this.almacenes.notifyOnChanges(); // Para que salte el onchange al inicializar la vista

    this.lineales.changes.subscribe(() => {
      // Lo de agregar subscriptions es para evitar llamar a los metodos cada vez que existan cambios
      this.subscriptionsLineal.forEach(s => s.unsubscribe());
      this.lineales.forEach(lineal => {
        this.subscriptionsLineal.push(lineal.movable.dragStart.subscribe(() => this.establecerLimitesZona(lineal.movable)));
        this.subscriptionsLineal.push(lineal.movable.dragEnd.subscribe(() => this.controlarLimitesZonaLineal(lineal)));
      });
    });
    this.lineales.notifyOnChanges(); // Para que salte el onchange al inicializar la vista
  }

  establecerLimitesZona(movable: MovableDirective) {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();
    this.boundaries = {
      minX: viewRect.left - movableRect.left + movable.position.x,
      maxX: viewRect.right - movableRect.right + movable.position.x,
      minY: viewRect.top - movableRect.top + movable.position.y,
      maxY: viewRect.bottom - movableRect.bottom + movable.position.y
    }
  };

  cambiarDeZonaAlmacen(almacen, zona, nuevaZona){
    console.log('cambio de zona ' + zona + ' a zona ' + nuevaZona);
    this.cambioZonaAlmacen.emit({almacen: almacen.datos, zona: zona, nuevaZona: nuevaZona, pos: almacen.movable.position});
  }

  cambiarDeZonaLineal(lineal, zona, nuevaZona){
    console.log('cambio de zona ' + zona + ' a zona ' + nuevaZona);
    this.cambioZonaLineal.emit({lineal: lineal.datos, zona: zona, nuevaZona: nuevaZona, pos: lineal.movable.position});
  }

  controlarLimitesZonaAlmacen(almacen: AlmacenComponent) {
    const zona = almacen.datos.zona.id;
    const movable = almacen.movable;
    if (zona === 1) {
      if (movable.position.x > this.boundaries.maxX && movable.position.y < this.boundaries.maxY) {
        this.cambiarDeZonaAlmacen(almacen, 1, 2);
      } else if (movable.position.x < this.boundaries.maxX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaAlmacen(almacen, 1, 3);
      } else if (movable.position.x > this.boundaries.maxX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaAlmacen(almacen, 1, 4);
      }
    } else if (zona === 2) {
      if (movable.position.x < this.boundaries.minX && movable.position.y < this.boundaries.maxY) {
        this.cambiarDeZonaAlmacen(almacen, 2, 1);
      } else if (movable.position.x < this.boundaries.minX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaAlmacen(almacen, 2, 3);
      } else if (movable.position.x > this.boundaries.minX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaAlmacen(almacen, 2, 4);
      }
    } else if (zona === 3) {
      if (movable.position.x < this.boundaries.maxX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaAlmacen(almacen, 3, 1);
      } else if (movable.position.x > this.boundaries.maxX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaAlmacen(almacen, 3, 2);
      } else if (movable.position.x > this.boundaries.maxX && movable.position.y > this.boundaries.minY) {
        this.cambiarDeZonaAlmacen(almacen, 3, 4);
      }
    } else {
      // zona 4
      if (movable.position.x < this.boundaries.minX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaAlmacen(almacen, 4, 1);
      } else if (movable.position.x > this.boundaries.minX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaAlmacen(almacen, 4, 2);
      } else if (movable.position.x < this.boundaries.minX && movable.position.y > this.boundaries.minY) {
        this.cambiarDeZonaAlmacen(almacen, 4, 3);
      }
    }
  }

  controlarLimitesZonaLineal(lineal: LinealComponent) {
    const zona = lineal.datos.zona.id;
    const movable = lineal.movable;
    if (zona === 1) {
      if (movable.position.x > this.boundaries.maxX && movable.position.y < this.boundaries.maxY) {
        this.cambiarDeZonaLineal(lineal, 1, 2);
      } else if (movable.position.x < this.boundaries.maxX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaLineal(lineal, 1, 3);
      } else if (movable.position.x > this.boundaries.maxX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaLineal(lineal, 1, 4);
      }
    } else if (zona === 2) {
      if (movable.position.x < this.boundaries.minX && movable.position.y < this.boundaries.maxY) {
        this.cambiarDeZonaLineal(lineal, 2, 1);
      } else if (movable.position.x < this.boundaries.minX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaLineal(lineal, 2, 3);
      } else if (movable.position.x > this.boundaries.minX && movable.position.y > this.boundaries.maxY) {
        this.cambiarDeZonaLineal(lineal, 2, 4);
      }
    } else if (zona === 3) {
      if (movable.position.x < this.boundaries.maxX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaLineal(lineal, 3, 1);
      } else if (movable.position.x > this.boundaries.maxX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaLineal(lineal, 3, 2);
      } else if (movable.position.x > this.boundaries.maxX && movable.position.y > this.boundaries.minY) {
        this.cambiarDeZonaLineal(lineal, 3, 4);
      }
    } else {
      // zona 4
      if (movable.position.x < this.boundaries.minX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaLineal(lineal, 4, 1);
      } else if (movable.position.x > this.boundaries.minX && movable.position.y < this.boundaries.minY) {
        this.cambiarDeZonaLineal(lineal, 4, 2);
      } else if (movable.position.x < this.boundaries.minX && movable.position.y > this.boundaries.minY) {
        this.cambiarDeZonaLineal(lineal, 4, 3);
      }
    }
  }  

}
