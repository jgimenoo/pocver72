import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinealesComponent } from './lineales.component';

describe('LinealesComponent', () => {
  let component: LinealesComponent;
  let fixture: ComponentFixture<LinealesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinealesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
