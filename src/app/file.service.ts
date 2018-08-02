import { Injectable } from '@angular/core';
import { Restangular } from '../../node_modules/ngx-restangular';
import { AuthService } from '@app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor( private restangular : Restangular, private authservice : AuthService) { }

  makeRequest(formData){
    this.restangular.all('upload').customPOST(formData,"http://localhost:8080",undefined,{'Content-Type':undefined})  }
}
