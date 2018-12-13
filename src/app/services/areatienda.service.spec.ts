import { TestBed } from '@angular/core/testing';

import { AreatiendaService } from './areatienda.service';

describe('AreatiendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreatiendaService = TestBed.get(AreatiendaService);
    expect(service).toBeTruthy();
  });
});
