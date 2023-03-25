import { TestBed } from '@angular/core/testing';

import { CurrentDetailService } from './current-detail.service';

describe('CurrentUserService', () => {
  let service: CurrentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
