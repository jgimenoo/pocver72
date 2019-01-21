import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExpoComponent } from './product-expo.component';

describe('ProductExpoComponent', () => {
  let component: ProductExpoComponent;
  let fixture: ComponentFixture<ProductExpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
