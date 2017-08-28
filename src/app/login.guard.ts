import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';


@Injectable()
export class LoginGuard implements CanActivate {
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.isUserLogged();
	}

	constructor(private service: Adal4Service, private http: Adal4HTTPService)
	{ }


	isUserLogged(): boolean {
		if (!this.service.userInfo.authenticated) {
			return false;
		}
		else {
			return true;
		}
	}
}
