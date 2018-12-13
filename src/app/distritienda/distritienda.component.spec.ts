import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritiendaComponent } from './distritienda.component';

describe('DistritiendaComponent', () => {
  let component: DistritiendaComponent;
  let fixture: ComponentFixture<DistritiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistritiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistritiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
