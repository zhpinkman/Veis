import { LoginComponent } from '@app/login/login.component';
import { AuthService } from "@app/Services/auth.service";
import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.accessToken != undefined) {
      console.log("you are logged in");

      return true;
    } else {
      console.log("you should log in first");
      this.router.navigate([LoginComponent]);
      return false;
    }
  }
}
