import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_NOT_AUTH } from '@app/restangular.config';
import { User } from '@app/User';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenService } from '@app/Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(RESTANGULAR_NOT_AUTH) private restangular, private token: TokenService) {}

  getBearerToken() {
    return this.token.accessToken;
  }
  signupRequest(newUser: User) {
    console.log(newUser.bucketName);
    return this.restangular.one('/user/register').post('', newUser);
  }

  LoginRequest(user: User) {
    const params = new HttpParams()
      .set('username', user.email.toLowerCase())
      .set('password', user.password)
      .set('grant_type', 'password');
    const authHeader = btoa('client:secret');
    return this.restangular
      .one('oauth/token')
      .customPOST(params.toString(), undefined, undefined, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Basic ${authHeader}`
      })
      .pipe(
        map<any, any>(data => {
          this.token.accessToken = data.access_token;
          this.token.refreshToken = data.refresh_token;
          return data;
        })
      );
  }


  requestLogout() {
    this.token.accessToken = undefined;
    console.log('loged out');
    localStorage.removeItem('access_token');
  }
}
