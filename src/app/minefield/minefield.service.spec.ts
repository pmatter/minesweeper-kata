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
    expect(service.createMinefield().field.length).toBe(4);
  });

  it('should have no revealed fields', () => {
    expect(service.createMinefield().revealed).toBe(0);
  });

  it('should have 1 mine', () => {
    expect(service.createMinefield().mines).toBe(1);
  });
});
