import { TestBed } from '@angular/core/testing';

import { UichangeService } from './uichange.service';

describe('UichangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UichangeService = TestBed.get(UichangeService);
    expect(service).toBeTruthy();
  });
});
