import { Injectable } from '@angular/core';
import { User } from './models';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Logger } from "angular2-logger/core";
import { ConstantsService } from './constants.service';
import { TokenService } from './token.service';
@Injectable()
export class UserService {

  constructor(private tokenService: TokenService, private constants: ConstantsService, private auth: Adal4Service, private http: Adal4HTTPService, private _logger: Logger) { }

  public currentUser: User = null;
  public getUser(refresh: boolean = false): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.currentUser != null && !refresh) {
        resolve(this.currentUser);
      }
      this.http.get(this.constants.getUserUrl, { headers: this.tokenService.getAuthHeaders() }).catch((error, caught) => { reject(); return null; }).toPromise().then(result => {
        console.log(result);
        if (result != null) {
          this.currentUser = result;
          resolve(result);
        }
        else {
          reject();
        }
      }).catch(error => {
        this.tokenService.loginIfNotAuthorized(error);
      });
    });
  } 

  public allUsers: User[];
  public getAllUsers(refresh: boolean = false): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      if (this.allUsers != null && !refresh) {
        resolve(this.allUsers);
      }
      console.log("calling getallusers");
      this.http.get(this.constants.getAllUsersUrl, { headers: this.tokenService.getAuthHeaders() }).toPromise().then(result => {
        console.log("getallusers done.");
        console.log(result);
        if (result != null) {
          this.allUsers = result;
          resolve(result);
        }
        else {
          reject();
        }
      }).catch(error => {
        this.tokenService.loginIfNotAuthorized(error);
      });
    });
  }

}
