import { Injectable, Inject, Pipe } from '@angular/core';
import { RESTANGULAR_AUTH } from '@app/restangular.config';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(@Inject(RESTANGULAR_AUTH) private restangular) {}

  makeRequest(formData) {
    this.restangular
      .one('file/upload')
      .customPOST(formData, undefined, undefined, {
        'Content-Type': undefined
      });
  }

  getFiles() {
    return this.restangular.one('file/list').get({ path: '' });
  }

  deleteFile(id: string) {
    this.restangular.one('file/delete' + id).post();
  }
}
