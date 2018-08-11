import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public _refreshToken: string;
  get refreshToken(): string {
    // console.log(this._refreshToken, localStorage.getItem('refresh_token'));
    if (this._refreshToken) {
      return this._refreshToken;
    } else if (
      localStorage.getItem('refresh_token') &&
      localStorage.getItem('refresh_token') != 'undefined'
    ) {
      console.log(localStorage.getItem('refresh_token'));
      this._refreshToken = localStorage.getItem('refresh_token');
      return localStorage.getItem('refresh_token');
    } else {
      return undefined;
    }
  }
  set refreshToken(current: string) {
    this._refreshToken = current;
    localStorage.setItem('refresh_token', this._refreshToken);
  }

  private _accessToken: string;
  get accessToken(): string {
    if (this._accessToken) {
      return this._accessToken;
    } else if (
      localStorage.getItem('access_token') &&
      localStorage.getItem('access_token') != 'undefined'
    ) {
      this._accessToken = localStorage.getItem('access_token');
      return localStorage.getItem('access_token');
    } else {
      return undefined;
    }
  }
  set accessToken(current: string) {
    this._accessToken = current;
    localStorage.setItem('access_token', this._accessToken);
  }
  constructor() {}
}
