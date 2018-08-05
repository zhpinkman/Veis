import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public refreshToken: string;

  private _accessToken: string;
  get accessToken(): string {
    if (this._accessToken) {
      return this._accessToken;
    } else if (localStorage.getItem('access_token')) {
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
