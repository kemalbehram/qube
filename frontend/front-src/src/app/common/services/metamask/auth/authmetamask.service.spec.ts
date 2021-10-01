import { TestBed } from '@angular/core/testing';

import { AuthmetamaskService } from './authmetamask.service';

describe('AuthmetamaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthmetamaskService = TestBed.get(AuthmetamaskService);
    expect(service).toBeTruthy();
  });
});
