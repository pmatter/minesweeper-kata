import { TestBed } from '@angular/core/testing';

import { MinefieldService } from './minefield.service';

describe('MinefieldService', () => {
  let service: MinefieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MinefieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a minefield', () => {
    expect(service.createMinefield().length).toBe(4);
  });
});
