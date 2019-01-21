import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulebaldaComponent } from './modulebalda.component';

describe('ModulebaldaComponent', () => {
  let component: ModulebaldaComponent;
  let fixture: ComponentFixture<ModulebaldaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulebaldaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulebaldaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
