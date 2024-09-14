import { TestBed } from '@angular/core/testing';

import { PreventiviService } from './preventivi.service';

describe('PreventiviService', () => {
  let service: PreventiviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventiviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
