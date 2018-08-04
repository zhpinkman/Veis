import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '@app/Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private token: TokenService, private router: Router) {}
  canActivate() {
    if (this.token.accessToken) {
      console.log('you are logged in');
      return true;
    } else {
      console.log('you should log in first');
      this.router.navigate(['login']);
      return false;
    }
  }
}
