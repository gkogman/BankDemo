import { Injectable } from '@angular/core';
import { Adal4Service } from 'adal-angular4';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class ProfileImageService {

  constructor(private authService: Adal4Service) { }


  public getProfileImageUrl(emailAddress : string): string{    
    if(emailAddress)
    {
       return "https://www.gravatar.com/avatar/" + new Md5().start().appendStr(emailAddress).end();
    }
  }
}
