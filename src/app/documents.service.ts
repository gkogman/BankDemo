import { Injectable } from '@angular/core';
import { User } from './models';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Logger } from "angular2-logger/core";
import { ConstantsService } from './constants.service';
import { FileUpload, Document } from './models';
import {TokenService} from './token.service';

@Injectable()
export class DocumentsService {

  constructor(private tokenService: TokenService, private constants: ConstantsService, private auth: Adal4Service, private http: Adal4HTTPService, private _logger: Logger, private _http: Http) { }

  public postDocuments(contractInstanceId: number, files: FileUpload[]) {
    if (files.length > 0) {
      let formData: FormData = new FormData();
      formData.append('contractInstanceId', contractInstanceId.toString());
      for (let i = 0; i < files.length; i++) {
        formData.append(files[i].File.name, files[i].File, files[i].File.name);
      }
      var path = this.constants.postContractInstanceDocumentsUrl;
      console.log(path);
      this._logger.debug("calling API at %s", path);
      return this._http.post(path, formData, { headers: this.tokenService.getAuthHeaders() }).toPromise();
    }
  }

  public getDocuments(contractInstanceId: number): Promise<Document[]> {
    return new Promise<Document[]>((resolve) => {
      var path = this.constants.getContractInstanceDocumentsUrl + this.constants.getContractInstanceDocumentsParameter1_Required + contractInstanceId;
      this._logger.debug("calling API at %s", path);
      this.http.get(path, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
        resolve(result);
      }).catch(error=> {
				this.tokenService.loginIfNotAuthorized(error);
			});
    });
  }

}
