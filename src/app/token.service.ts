import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

@Injectable()
export class TokenService {

  constructor(private auth: Adal4Service) { }

	public getAuthHeaders(): Headers {
		var token = this.auth.userInfo.token;
		let headers = new Headers();
		headers.append("Authorization", "Bearer " + token);
		return headers;
	}

  public loginIfNotAuthorized(error : any){
    if(error.status == 401)
				{
					this.auth.login();
				}
  }
}
