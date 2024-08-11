import { TestBed } from '@angular/core/testing';

import { SousAdminService } from '../Service/sous-admin.service';

describe('SousAdminService', () => {
  let service: SousAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
