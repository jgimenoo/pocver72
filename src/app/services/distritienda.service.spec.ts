import { TestBed } from '@angular/core/testing';

import { DistritiendaService } from './distritienda.service';

describe('DistritiendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistritiendaService = TestBed.get(DistritiendaService);
    expect(service).toBeTruthy();
  });
});
