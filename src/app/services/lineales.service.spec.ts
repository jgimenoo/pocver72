import { TestBed } from '@angular/core/testing';

import { LinealesService } from './lineales.service';

describe('LinealesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinealesService = TestBed.get(LinealesService);
    expect(service).toBeTruthy();
  });
});
