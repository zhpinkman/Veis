import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '@app/Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private token: TokenService, private router: Router) {}
  canActivate() {
    // console.log(this.token, this.token.accessToken);
    if (this.token.accessToken) {
      // if (this.router. == 'login')
      // if(this.router == login || this.router == signup ){
      // this.router.navigate(['home']);
      // }
      console.log('you are already logged in');
      return true;
    }
  }
}
