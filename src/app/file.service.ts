import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { AuthService } from '@app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor( private restangular: Restangular) { }

  makeRequest(formData) {
    this.restangular.one('file/upload').customPOST(formData, undefined, undefined, {'Content-Type': undefined});}
}
