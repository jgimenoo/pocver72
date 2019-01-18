import { TestBed } from '@angular/core/testing';

import { ZonasyseccionesService } from './zonasysecciones.service';

describe('ZonasyseccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZonasyseccionesService = TestBed.get(ZonasyseccionesService);
    expect(service).toBeTruthy();
  });
});
