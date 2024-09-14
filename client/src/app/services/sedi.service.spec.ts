import { TestBed } from '@angular/core/testing';

import { SediService } from './sedi.service';

describe('SediService', () => {
  let service: SediService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SediService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
