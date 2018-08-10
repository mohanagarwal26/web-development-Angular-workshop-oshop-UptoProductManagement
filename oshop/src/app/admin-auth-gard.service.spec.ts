import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthGard } from './admin-auth-gard.service';

describe('AdminAuthGardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGard]
    });
  });

  it('should be created', inject([AdminAuthGard], (service: AdminAuthGard) => {
    expect(service).toBeTruthy();
  }));
});
