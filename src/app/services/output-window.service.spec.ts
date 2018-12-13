import { TestBed } from '@angular/core/testing';

import { OutputWindowService } from './output-window.service';

describe('OutputWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutputWindowService = TestBed.get(OutputWindowService);
    expect(service).toBeTruthy();
  });
});
