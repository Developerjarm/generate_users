import { TestBed } from '@angular/core/testing';

import { UserSitarService } from './user-sitar.service';

describe('UserSitarService', () => {
  let service: UserSitarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSitarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
