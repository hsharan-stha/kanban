import { TestBed } from '@angular/core/testing';

import { ButtonSubmitService } from './button-submit.service';

describe('ButtonSubmitService', () => {
  let service: ButtonSubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonSubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
