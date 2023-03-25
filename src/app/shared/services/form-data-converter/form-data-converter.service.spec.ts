import { TestBed } from '@angular/core/testing';

import { FormDataConverterService } from './form-data-converter.service';

describe('FormDataConverterService', () => {
  let service: FormDataConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
