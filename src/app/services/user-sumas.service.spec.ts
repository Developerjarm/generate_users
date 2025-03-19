import { TestBed } from '@angular/core/testing';

import { UserSumasService } from './user-sumas.service';

describe('UserSumasService', () => {
  let service: UserSumasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSumasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
