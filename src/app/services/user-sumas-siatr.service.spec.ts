import { TestBed } from '@angular/core/testing';

import { UserSumasSiatrService } from './user-sumas-siatr.service';

describe('UserSumasSiatrService', () => {
  let service: UserSumasSiatrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSumasSiatrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
