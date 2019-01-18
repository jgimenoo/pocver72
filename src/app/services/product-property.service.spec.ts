import { TestBed } from '@angular/core/testing';

import { ProductPropertyService } from './product-property.service';

describe('ProductPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPropertyService = TestBed.get(ProductPropertyService);
    expect(service).toBeTruthy();
  });
});
