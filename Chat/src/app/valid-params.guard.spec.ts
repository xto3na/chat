import { TestBed, async, inject } from '@angular/core/testing';

import { ValidParamsGuard } from './valid-params.guard';

describe('ValidParamsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidParamsGuard]
    });
  });

  it('should ...', inject([ValidParamsGuard], (guard: ValidParamsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
