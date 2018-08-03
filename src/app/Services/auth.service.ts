import {Injectable, Inject} from '@angular/core';
import {RESTANGULAR_AUTH} from '@app/restangular.config';
import {User} from '@app/User';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(RESTANGULAR_AUTH) public RestangularAuth,private http: HttpClient) {
  }

  email: String;
  password: String;

  getBearerToken() {
    //TODO return user token
  }

  signupRequest(newUser: User) {
    console.log(newUser.bucketName)
    return this.RestangularAuth.one('/user/register').post('', newUser);
  }

  LoginRequest(user: User) {

    const params = new HttpParams().set('username', user.email).set('password', user.password).set('grant_type', 'password');
    const authHeader = btoa('client:secret');
    return this.RestangularAuth.one('oauth/token')
      .customPOST(
        params.toString(),
        undefined,
        undefined,
        {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': `Basic ${authHeader}`}
      );
  }
}
