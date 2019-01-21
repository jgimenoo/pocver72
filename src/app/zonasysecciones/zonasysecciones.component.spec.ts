import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasyseccionesComponent } from './zonasysecciones.component';

describe('ZonasyseccionesComponent', () => {
  let component: ZonasyseccionesComponent;
  let fixture: ComponentFixture<ZonasyseccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonasyseccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasyseccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
