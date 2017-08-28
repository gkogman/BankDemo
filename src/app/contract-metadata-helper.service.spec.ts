import { TestBed, inject } from '@angular/core/testing';

import { ContractMetadataHelperService } from './contract-metadata-helper.service';

describe('ContractMetadataHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractMetadataHelperService]
    });
  });

  it('should be created', inject([ContractMetadataHelperService], (service: ContractMetadataHelperService) => {
    expect(service).toBeTruthy();
  }));
});
