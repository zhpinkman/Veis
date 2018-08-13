import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RenameRequest } from './../renameRequest';
import { DeleteRequest } from './../DeleteRequest';
import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_AUTH } from '@app/restangular.config';
import { Subject } from 'rxjs/internal/Subject';

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
  mysubject = new Subject();

  getFiles() {
    return this.restangular.one('file/list').get({ path: '/' });
  }

  renameFile(renameRequest: RenameRequest) {
    return this.restangular.one('file/rename').customPOST(renameRequest);
  }
  deleteFile(id: string, deleteRequest: DeleteRequest) {
    return this.restangular.one('file/delete').customPOST(deleteRequest);
    // .delete({ path: '/api' }, { params: { id: id, path: '/' } });
  }
}
