import { TestBed, inject } from '@angular/core/testing';

import { LookupByAdressesService } from './lookup-by-adresses.service';

describe('LookupByAdressesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupByAdressesService]
    });
  });

  it('should be created', inject([LookupByAdressesService], (service: LookupByAdressesService) => {
    expect(service).toBeTruthy();
  }));
});
