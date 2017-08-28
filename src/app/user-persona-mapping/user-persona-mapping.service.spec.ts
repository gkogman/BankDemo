import { TestBed, inject } from '@angular/core/testing';

import { UserPersonaMappingService } from './user-persona-mapping.service';

describe('UserPersonaMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPersonaMappingService]
    });
  });

  it('should be created', inject([UserPersonaMappingService], (service: UserPersonaMappingService) => {
    expect(service).toBeTruthy();
  }));
});
