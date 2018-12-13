import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreatiendaComponent } from './areatienda.component';

describe('AreatiendaComponent', () => {
  let component: AreatiendaComponent;
  let fixture: ComponentFixture<AreatiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreatiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreatiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
