import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_AUTH } from '@app/restangular.config';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(@Inject(RESTANGULAR_AUTH) private restangular) {}

  makeRequest(formData) {
    this.restangular.one('file/upload').customPOST(formData, undefined, undefined, { 'Content-Type': undefined });
  }

  getFiles(){
    return this.restangular.one('file/all').get();
  }
}
