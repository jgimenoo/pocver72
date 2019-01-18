import { TestBed } from '@angular/core/testing';

import { ProductExpoService } from './product-expo.service';

describe('ProductExpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductExpoService = TestBed.get(ProductExpoService);
    expect(service).toBeTruthy();
  });
});
