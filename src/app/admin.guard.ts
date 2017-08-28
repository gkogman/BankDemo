import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import {ConstantsService} from './constants.service';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isUserAdmin();
  }
  constructor(private adalService: Adal4Service, private http: Adal4HTTPService, private constants : ConstantsService)
  { }


  isUserAdmin(): boolean {
    const adminGroupId = this.constants.getAdminGroupId;
    try {
      if (this.adalService.userInfo.profile.groups.some(x => x === adminGroupId)) {
        return true;
      }

      return false;

    } catch (error) {
      console.warn('ensure that the AAD Application Manfiest contains groupMembershipClaims: SecurityGroup');
      console.error(`failed to check isUserAdmin ${error}`);
    }
    return false;
  }
}
