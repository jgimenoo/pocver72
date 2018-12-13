import { TestBed } from '@angular/core/testing';

import { ShopsserviceService } from './shopsservice.service';

describe('ShopsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopsserviceService = TestBed.get(ShopsserviceService);
    expect(service).toBeTruthy();
  });
});
