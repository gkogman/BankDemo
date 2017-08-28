import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { TokenService } from './token.service';
import { User, ContractMetadata } from './models';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Logger } from "angular2-logger/core";
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

@Injectable()
export class LookupByAddressesService {

  constructor(private tokenService: TokenService, private constants: ConstantsService, private _logger: Logger, private auth: Adal4Service, private http: Adal4HTTPService) { }

  public lookupContractsByAddresses(addresses: string): Promise<ContractMetadata[]> {
    return new Promise<ContractMetadata[]>((resolve) => {
      var path = this.constants.getLookupContractsUrl + this.constants.getLookupContractsParameter1_Required + addresses;
      this._logger.debug("calling API at %s", path);
      this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then((result: any) => {
        resolve(result);
      }).catch(error => {
        this.tokenService.loginIfNotAuthorized(error);
      });
    });
  }

  public lookupUsersByAddresses(addresses: string): Promise<User[]> {
    return new Promise<User[]>((resolve) => {
      var path = this.constants.getLookupUsersUrl + this.constants.getLookupUsersParameter1_Required + addresses;
      this._logger.debug("calling API at %s", path);
      this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then((result: any) => {
        resolve(result);
      }).catch(error => {
        this.tokenService.loginIfNotAuthorized(error);
      });
    });
  }

}
