import { TestBed, inject } from '@angular/core/testing';

import { ContractInstanceActionParameterHelperService } from './contract-instance-action-parameter-helper.service';

describe('ContractInstanceActionParameterHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractInstanceActionParameterHelperService]
    });
  });

  it('should be created', inject([ContractInstanceActionParameterHelperService], (service: ContractInstanceActionParameterHelperService) => {
    expect(service).toBeTruthy();
  }));
});
