import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConstantsService {

  constructor(private http: Http) { }

  _startupData;

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  load(): Promise<any> {

    this._startupData;

    return this.http
      .get('/config.json')
      .map((res: Response) => res.json())
      .toPromise()
      .then((data: any) => this._startupData = data)
      .catch((err: any) => Promise.resolve());
  }

  get startupData(): any {
    this._startupData=
    {
       "GatewayApiUrl": "http://deploylex22-3dkx-api.azurewebsites.net",
        "ActiveDirectoryTenant": "TSACHILUTATYPOALIMCO.onmicrosoft.com",
      "ActiveDirectoryClientId": "50d81c71-0cbf-4b87-a414-a161a5571918",
      "AdminGroupId": "9b0143d5-3546-45a1-9253-89397ff39299",
    "DashboardUrl": "http://ethstats.net"  
    };
  return this._startupData;
  }

  get gatewayApiHost(): string {
    let rv = //this._startupData["GatewayApiUrl"] ||
       environment.gatewayApiHost || 'http://localhost:3030';
    console.log('constants.service: gatewayApiHost: %s', rv);
    return rv;
  }

  get getAdminGroupId(): string {
    let rv = this._startupData["AdminGroupId"] || environment.adminGroupId
    return rv;
  }

  get activeDirectoryClientId(): string {
    let rv = this._startupData["ActiveDirectoryClientId"]
      || environment.clientId || 'b9821450-3e4d-4d9f-b323-d5d8a8bcf991';
    console.log('constants.service: clientId: %s', rv);
    if (!rv) console.error('NO AAD ClientId defined');
    return rv;
  }

  get activeDirectoryTenant(): string {
    let rv ="TSACHILUTATYPOALIMCO.onmicrosoft.com";  //this._startupData["ActiveDirectoryTenant"];
    console.log('constants.service: tenant: %s', rv);
    if (!rv) console.error('NO AAD Tenant defined');
    return rv;
  }

  get dashboardUrl(): string {
    let rv = this._startupData["DashboardUrl"] || "http://ethstats.net";
    console.log('constants.service: dashboardUrl: %s', rv);
    return rv;
  }


  get updateDataTime(): number {
    return environment.updateTimeInMilliseconds;
  }

  get getAllDemosUrl(): string {
    return this.gatewayApiHost + '/api/upload/getAllDemos'
  }

  get getContractsUrl(): string {
    return this.gatewayApiHost + '/api/contracts/getContracts';
  }

  get getAllContractsUrl(): string {
    return this.gatewayApiHost + '/api/contracts/getAllContracts';
  }

  get getContractUrl(): string {
    return this.gatewayApiHost + '/api/contracts/getContract';
  }

  get getContractParameter1_Required(): string {
    return '?contractId=';
  }

  get getContractInstancesUrl(): string {
    return this.gatewayApiHost + '/api/contractInstances/getContractInstances';
  }

  get getContractInstancesParameter1_Required(): string {
    return '?contractId=';
  }

  get getContractInstancesParameter2_Optional(): string {
    return '&contractStateId=';
  }

  get getContractInstanceUrl(): string {
    return this.gatewayApiHost + '/api/contractinstances/getContractInstance';
  }

  get getContractInstanceParameter1_Required(): string {
    return '?contractInstanceId=';
  }

  get getUserUrl(): string {
    return this.gatewayApiHost + '/api/users/getUser';
  }

  get getAllUsersUrl(): string {
    return this.gatewayApiHost + '/api/users/getAllUsers';
  }

  get getContractInstanceActivityUrl(): string {
    return this.gatewayApiHost + '/api/contractinstances/getContractInstanceActivity';
  }

  get getContractInstanceActivityParameter1_Required(): string {
    return '?contractInstanceId=';
  }

  get getContractInstanceNotificationsUrl(): string {
    return this.gatewayApiHost + '/api/contractinstances/getContractInstanceNotifications';
  }

  get getContractInstanceNotificationsParameter1_Required(): string {
    return '?contractId=';
  }

  get postContractInstanceActionUrl(): string {
    return this.gatewayApiHost + '/api/contractinstances/postContractInstanceAction';
  }

  get postContractInstanceDocumentsUrl(): string {
    return this.gatewayApiHost + '/api/contractinstances/postContractInstanceDocuments';
  }

  get postUploadContractUrl(): string {
    return this.gatewayApiHost + '/api/upload/contract';
  }

  get getContractInstanceDocumentsUrl(): string {
    return this.gatewayApiHost + '/api/contractInstances/getContractInstanceDocuments';
  }

  get getContractInstanceDocumentsParameter1_Required(): string {
    return '?contractInstanceId=';
  }

  get getLookupUsersUrl(): string {
    return this.gatewayApiHost + '/api/users/lookupUsers';
  }

  get getLookupUsersParameter1_Required(): string {
    return "?addresses=";
  }

  get getLookupContractsUrl(): string {
    return this.gatewayApiHost + '/api/contractInstances/lookupContracts';
  }

  get getLookupContractsParameter1_Required(): string {
    return "?addresses=";
  }

  get getUserPersonaMappingsUrl(): string {
    return this.gatewayApiHost + '/api/users/getUserMappings';
  }

  get getUserPersonaMappingsParameter1_Optional(): string {
    return '?page=';
  }
  get getUserPersonaMappingsParameter2_Optional(): string {
    return '&count=';
  }

  get getCreateUpdateUserMappingUrl(): string {
    return this.gatewayApiHost + '/api/users/createUpdateUserMapping';
  }

  get getDeleteUserMappingUrl(): string {
    return this.gatewayApiHost + '/api/users/deleteUserMapping';
  }

  get getDeployDemoUrl(): string {
    return this.gatewayApiHost + '/api/upload/deployDemo'
  }

  get getDeleteUserMappingParameter1_Required(): string {
    return '?id=';
  }

}
