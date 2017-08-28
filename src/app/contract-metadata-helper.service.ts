import { Injectable } from '@angular/core';
import { ContractMetadata } from './models';
@Injectable()
export class ContractMetadataHelperService {

  constructor() { }

  public getNameForContractType(contractMetadata: ContractMetadata): string {
    if (contractMetadata) {
      if (contractMetadata.Description)
        return contractMetadata.Description;
      else
        return 'Contract';
    }
    else {
      return '';
    }
  }

}
