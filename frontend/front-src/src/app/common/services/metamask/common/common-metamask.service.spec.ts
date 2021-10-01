import { TestBed } from '@angular/core/testing';

import { CommonMetamaskService } from './common-metamask.service';

describe('CommonMetamaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonMetamaskService = TestBed.get(CommonMetamaskService);
    expect(service).toBeTruthy();
  });
});
