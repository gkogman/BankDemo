import { Injectable } from '@angular/core';
import { User } from './models';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Logger } from "angular2-logger/core";
import { ConstantsService } from './constants.service';
import { TokenService} from './token.service';

@Injectable()
export class UploadService {

  constructor(private tokenService: TokenService, private constants: ConstantsService, private auth: Adal4Service, private http: Adal4HTTPService, private _logger: Logger, private _http: Http) { }

  public postUploadContract(files: any) {
    let formData: FormData = new FormData();

    for (var field in files) {
      formData.append(field, files[field], files[field].name)
    }

    var path = this.constants.postUploadContractUrl;
    this._logger.debug("calling API at %s", path);
    return this._http.post(path, formData, { headers: this.tokenService.getAuthHeaders() }).toPromise();
  }
}

