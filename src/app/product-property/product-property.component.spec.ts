import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPropertyComponent } from './product-property.component';

describe('ProductPropertyComponent', () => {
  let component: ProductPropertyComponent;
  let fixture: ComponentFixture<ProductPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
