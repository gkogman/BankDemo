import { Injectable } from '@angular/core';
import { User, Notification, ContractMetadata, ContractAction, ContractInstance, ContractInstanceActivity, ContractInstanceActivityInput } from './models';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { ConstantsService } from './constants.service';
import { TokenService } from './token.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Logger } from "angular2-logger/core";

@Injectable()
export class ContractService {

	constructor(private tokenService: TokenService, private constants: ConstantsService, private auth: Adal4Service, private http: Adal4HTTPService, private _logger: Logger) { }

	public getContracts(): Promise<any[]> {
		return new Promise<any[]>((resolve, reject) => {
			this._logger.debug("calling API at %s", this.constants.getContractsUrl);
			this.http.get(this.constants.getContractsUrl, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
				resolve(result);
			}).catch(error => {
				this.tokenService.loginIfNotAuthorized(error);
				reject(error);
			});
		});
	}

	public getAllContracts(): Promise<any[]> {
		return new Promise<any[]>((resolve) => {
			this._logger.debug("calling API at %s", this.constants.getAllContractsUrl);
			this.http.get(this.constants.getAllContractsUrl, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
				resolve(result);
			}).catch(error=> {
				this.tokenService.loginIfNotAuthorized(error);
			});
		});
	}

	public getContract(contractId: number): Promise<ContractMetadata> {
		return new Promise<ContractMetadata>((resolve, reject) => {
			this.http.get(this.constants.getContractUrl + this.constants.getContractParameter1_Required + contractId,
				{ headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
					resolve(result);
				}).catch(error => {
					this.tokenService.loginIfNotAuthorized(error);
					reject(error);
				});
		});
	}

	public getNotifications(contractId: number): Promise<Notification[]> {
		return new Promise<Notification[]>((resolve, reject) => {
			var path = this.constants.getContractInstanceNotificationsUrl + this.constants.getContractInstanceNotificationsParameter1_Required + contractId;
			this._logger.debug("calling API at %s", path);
			this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
				resolve(result);
			}).catch(error => {
				this.tokenService.loginIfNotAuthorized(error);				
				reject(error);
			});
		});
	}

	public getContractInstances(contractId: number): Promise<ContractInstance[]> {
		return new Promise<ContractInstance[]>((resolve, reject) => {
			var path = this.constants.getContractInstancesUrl + this.constants.getContractInstancesParameter1_Required + contractId;
			this._logger.debug("calling API at %s", path);
			this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then((result: ContractInstance[]) => {
				resolve(result);
			}).catch(error => {
				this.tokenService.loginIfNotAuthorized(error);				
				reject(error);
			});
		});
	}

	private contractInstances: ContractInstance[] = [];
	public getContractInstance(contractInstanceId: number, refresh: boolean = false): Promise<ContractInstance> {
		var cachedValue: ContractInstance = this.contractInstances.find(cia => cia.ContractInstanceID == contractInstanceId);
		if (!cachedValue || refresh) {
			return new Promise<ContractInstance>((resolve, reject) => {
				var path = this.constants.getContractInstanceUrl + this.constants.getContractInstanceParameter1_Required + contractInstanceId;
				this._logger.debug("calling API at %s", path);
				this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(contractInstance => {
					console.log(contractInstance);
					this.contractInstances = this.contractInstances.filter(cia => cia.ContractInstanceID != contractInstanceId);
					this.contractInstances.push(contractInstance);
					resolve(contractInstance);
				}).catch(error => {
					this.tokenService.loginIfNotAuthorized(error);					
					reject(error);
				});
			});
		}
		else {
			this._logger.debug("returning cached value for getContractInstance");
			return new Promise<ContractInstance>((resolve) => resolve(cachedValue));
		}
	}


	private contractInstanceActivities: ContractInstanceActivity[] = [];
	public getContractInstanceActivity(contractInstanceId: number, refresh?: boolean) : Promise<ContractInstanceActivity[]> {

			var cachedValue: ContractInstanceActivity[] = this.contractInstanceActivities.filter(cia => cia.ContractInstanceID == contractInstanceId);
			if (cachedValue || refresh) {
				var path = this.constants.getContractInstanceActivityUrl + this.constants.getContractInstanceActivityParameter1_Required + contractInstanceId;
				this._logger.debug("calling API at %s", path);
				return this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(activities => {
					this.contractInstanceActivities = this.contractInstanceActivities.filter(cia => cia.ContractInstanceID != contractInstanceId);
					this.contractInstanceActivities.push(activities);
					return activities;
				}).catch(error => {
					this.tokenService.loginIfNotAuthorized(error);
					return new Promise<ContractInstanceActivity[]>((resolve, reject) => reject(error));
				});
		}
		else {
			return new Promise<ContractInstanceActivity[]>((resolve) => resolve(cachedValue));
		}
	}

	public createContract(contractInput: ContractInstanceActivityInput): void {
		for (var i = 0; i < contractInput.Parameters.length; i++) {
			contractInput.Parameters[i].Value = contractInput.Parameters[i].Value.toString();
		}
		var path = this.constants.postContractInstanceActionUrl;
		console.log(contractInput);
		this._logger.debug("calling API at %s", path);
		this.http.post(path, contractInput, { headers: this.tokenService.getAuthHeaders() }).subscribe(error => { this.tokenService.loginIfNotAuthorized(error); });
	}
}
