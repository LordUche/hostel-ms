import { TestBed, async, inject } from '@angular/core/testing';

import { EditHostelGuard } from './edit-hostel.guard';

describe('EditHostelGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditHostelGuard]
    });
  });

  it('should ...', inject([EditHostelGuard], (guard: EditHostelGuard) => {
    expect(guard).toBeTruthy();
  }));
});
