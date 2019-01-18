import { TestBed } from '@angular/core/testing';

import { ModulebaldaService } from './modulebalda.service';

describe('ModulebaldaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModulebaldaService = TestBed.get(ModulebaldaService);
    expect(service).toBeTruthy();
  });
});
