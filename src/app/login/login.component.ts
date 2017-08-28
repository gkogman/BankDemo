import { Component, OnInit, OnDestroy } from '@angular/core';
import { Adal4Service, Adal4User, Adal4HTTPService } from 'adal-angular4';
import { ProfileImageService } from "app/profile-image.service";
import { Logger } from "angular2-logger/core";
import { ConstantsService } from '../constants.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Local } from '../../localization/Local_He';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
public local:Local;
  constructor(private adalService: Adal4Service, private http: Adal4HTTPService,
    private router: Router, private profileImageService: ProfileImageService,
    private _logger: Logger, private constants: ConstantsService,
    private userService: UserService) {
      this.local=new Local();
  }

  ngOnInit() {
    this.adalService.handleWindowCallback();

    // Check if the user is authenticated. If not, call the login() method
    if (!this.adalService.userInfo.authenticated) {
      this._logger.log("user is not authenticated. starting login");
      this.adalService.login();
    }

    // Log the user information to the console
    this._logger.log('username: %s', this.adalService.userInfo.username);
    this._logger.log('authenticated: %s', this.adalService.userInfo.authenticated);
    this._logger.log('profile: %s', this.adalService.userInfo.profile);
    this._logger.log(
      'name: %s', this.adalService.userInfo.profile ? this.adalService.userInfo.profile.name : undefined);

    var str = /#(.+)/.exec(location.href);
    if (str) {
      var valueToReplace = /#(.+)/.exec(location.href)[1];
      location.href = location.href.replace(valueToReplace, '');
    }

    this.loadUser();
  }
  
  ngOnDestroy() {
  
  }


  private loadUser() {
    if (this.userService.currentUser == null) {
      this.userService.getUser().then(user => {
        console.log('getUser finished');
      })
    }
  }
  public login() {
    this.adalService.login();
  }

  public logout() {
    this.adalService.logOut();
  }

  public getUser(): Adal4User {
    return this.adalService.userInfo;
  }

  public isAuthenticated(): boolean {
    return this.adalService.userInfo.authenticated;
  }

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

  goToUserPage(): void {
    this.router.navigate(['/admin']);
  }

  navigateToDashboard(): void {
    window.open(this.constants.dashboardUrl);
  }
}
