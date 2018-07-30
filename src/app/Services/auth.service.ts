import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_AUTH } from '@app/restangular.config';
import { User } from '@app/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( @Inject(RESTANGULAR_AUTH) public RestangularAuth) {

   }

   getBearerToken(){
     //TODO return user token
   }

  //  signupRequest(newUser: User){
  //   let request = this.RestangularAuth.one('signup');
  //   return request.post(newUser);
  //  }
}
