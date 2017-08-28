import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { ConstantsService } from '../constants.service';
import { TokenService } from '../token.service';
import { Logger } from "angular2-logger/core";
import { UserAssignment, UserAssignmentPage } from '../models';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserPersonaMappingService {

	constructor(private tokenService: TokenService, private constants: ConstantsService, private auth: Adal4Service, private http: Adal4HTTPService, private _logger: Logger) { }

	public getUserAssignments(page: number, count: number): Promise<UserAssignmentPage> {
		return new Promise<UserAssignmentPage>((resolve) => {
			this._logger.debug("calling API at %s", this.constants.getUserPersonaMappingsUrl);
			this.http.get(this.constants.getUserPersonaMappingsUrl + this.constants.getUserPersonaMappingsParameter1_Optional + page + this.constants.getUserPersonaMappingsParameter2_Optional + count, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
				resolve(result);
			}).catch(error => {
				this.tokenService.loginIfNotAuthorized(error);
			});
		});
	}

	public createUserAssignment(userAssignment: UserAssignment): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			var path = this.constants.getCreateUpdateUserMappingUrl;
			this._logger.debug("calling API at %s", path);
			var createObject = {
				ContractID: userAssignment.Contract.ContractID,
				PersonaID: userAssignment.Persona.PersonaID,
				UserID: userAssignment.User.UserID
			};
			console.log(createObject);
			this.http.post(path, createObject, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(x => resolve()).catch(error => { this.tokenService.loginIfNotAuthorized(error); reject(); });
		});
	}

	public updateUserAssignment(userAssignment: UserAssignment): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			var path = this.constants.getCreateUpdateUserMappingUrl;
			this._logger.debug("calling API at %s", path);
			var createObject = {
				ID: userAssignment.ID,
				ContractID: userAssignment.Contract.ContractID,
				PersonaID: userAssignment.Persona.PersonaID,
				UserID: userAssignment.User.UserID
			};
			console.log(createObject);
			this.http.post(path, createObject, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(x => resolve()).catch(error => { this.tokenService.loginIfNotAuthorized(error); reject(); });
		});
	}

	public deleteUserAssignment(id: number): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this._logger.debug("calling API at %s", this.constants.getUserPersonaMappingsUrl);
			this.http.get(this.constants.getDeleteUserMappingUrl + this.constants.getDeleteUserMappingParameter1_Required + id, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(x => resolve()).catch(error => {
				this.tokenService.loginIfNotAuthorized(error);
			});
		});
	}
}
