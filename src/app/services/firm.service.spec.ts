import { TestBed } from '@angular/core/testing';

import { FirmService } from './firm.service';

describe('FirmService', () => {
  let service: FirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
