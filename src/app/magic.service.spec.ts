import { TestBed, inject } from '@angular/core/testing';

import { MagicService } from './magic.service';

describe('MagicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagicService]
    });
  });

  it('should ...', inject([MagicService], (service: MagicService) => {
    expect(service).toBeTruthy();
  }));
});
