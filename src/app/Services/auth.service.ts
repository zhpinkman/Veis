import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_AUTH } from '../restangular.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( @Inject(RESTANGULAR_AUTH) public RestangularAuth) {

   }

   getBearerToken(){
     //TODO return user token
   }
}
