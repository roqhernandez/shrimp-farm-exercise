import { TestBed } from '@angular/core/testing';

import { PondsService } from './ponds.service';

describe('PondsService', () => {
  let service: PondsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PondsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
