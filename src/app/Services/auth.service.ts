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

   signupRequest(newUser: User){
    return this.RestangularAuth.oneUrl('signup','http://localhost:8080/users/signup').post('',newUser);
   }
}
