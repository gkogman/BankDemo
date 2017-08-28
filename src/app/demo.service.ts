import { Injectable } from '@angular/core';
import { User } from './models';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { ConstantsService } from './constants.service';
import { TokenService } from './token.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Logger } from "angular2-logger/core";

@Injectable()
export class DemoService {

  constructor(private tokenService: TokenService, private constants: ConstantsService, private auth: Adal4Service, private http: Adal4HTTPService, private _logger: Logger) { }

  public getAllDemos(): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      this._logger.debug("calling API at %s", this.constants.getAllDemosUrl);
      this.http.get(this.constants.getAllDemosUrl, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
        resolve(result);
      }).catch(error => {
        this.tokenService.loginIfNotAuthorized(error);
      });
    });
  }

  public deployDemo(demoName: string): Promise<string> {
   var path = this.constants.getDeployDemoUrl;
   this._logger.debug("calling API at %s with demo name %s", path, demoName);
   return this.http.post(path, { DemoName : demoName }, { headers: this.tokenService.getAuthHeaders() }).toPromise()
  }
}
