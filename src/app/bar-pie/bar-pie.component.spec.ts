import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPieComponent } from './bar-pie.component';

describe('BarPieComponent', () => {
  let component: BarPieComponent;
  let fixture: ComponentFixture<BarPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
