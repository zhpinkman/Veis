import { mkDirRequest } from './../mkDirRequest';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RenameRequest } from '@app/renameRequest';
import { DeleteRequest } from '@app/DeleteRequest';
import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_AUTH } from '@app/restangular.config';
import { PathClass } from '@app/PathClass';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    @Inject(RESTANGULAR_AUTH) private restangular,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('zzz');
    router.events.subscribe((url: any) => {
      //  console.log(url);
      if (url instanceof NavigationEnd) {
        console.log(url);
        console.log(url.url);
        let path = url.url.toString().split('/');
        let parent = path[1].split('%5E');

        this.currentPath = new PathClass(parent[0]);
        for (let i = 1; i < parent.length; i++) {
          this.currentPath = new PathClass(parent[i], this.currentPath);
        }
        console.log(this.currentPath);
        console.log(this.currentPath.name);
        console.log(this.currentPath.pathToString());
      }
    });
  }

  public currentPath: PathClass;
  makeRequest(formData) {
    this.restangular
      .one('file/upload')
      .customPOST(formData, undefined, undefined, {
        'Content-Type': undefined
      });
  }
  mysubject = new Subject();
  showMode = new Subject();
  selectMode = new Subject();
  newFilesComming = new Subject();

  getFiles() {
    return this.restangular.one('file/list').get({ path: '/' });
  }
  mkDir(folderName: string) {
    let mkDirRequest: mkDirRequest = {
      name: folderName,
      path: this.currentPath.pathToString()
    };
    if (mkDirRequest.path == '/') {
      mkDirRequest.path = '';
      console.log('path was / ');
    }
    return this.restangular.one('file/mkDir').customPOST(mkDirRequest);
  }

  renameFile(renameRequest: RenameRequest) {
    return this.restangular.one('file/rename').customPOST(renameRequest);
  }
  deleteFile(id: string, deleteRequest: DeleteRequest) {
    return this.restangular.one('file/delete').customPOST(deleteRequest);
  }
  navigateTo() {
    // TO DO
  }
}
