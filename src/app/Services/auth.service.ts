import {Injectable, Inject} from '@angular/core';
import {RESTANGULAR_AUTH} from '@app/restangular.config';
import {User} from '@app/User';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshToken: string;

  private _accessToken: string;
  get accessToken(): string {
    return this._accessToken || localStorage.getItem('access_token');
  }
  set accessToken(current: string) {
    this._accessToken = current;
    localStorage.setItem('access_token', this._accessToken);
  }

  constructor(@Inject(RESTANGULAR_AUTH) public RestangularAuth,private http: HttpClient) {
  }

  getBearerToken() {
    return this.accessToken;
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
      ).pipe(map<any, any>(data => {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        return data;
      }));
  }
}
