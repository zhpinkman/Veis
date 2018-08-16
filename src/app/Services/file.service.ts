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
        // console.log(url.url);
        let path = url.url.toString().split('/');
        let parent = path[1].split('%5E');

        if (parent.toString() == 'upload') return;
        // console.log('test');
        this.currentPath = new PathClass(parent[0]);
        for (let i = 1; i < parent.length; i++) {
          this.currentPath = new PathClass(parent[i], this.currentPath);
        }
        // console.log(this.currentPath);
        // console.log(this.currentPath.name);
        // console.log(this.currentPath.pathToString());

        this.loadFiles.next();
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
  select = new Subject();
  showMode = new Subject();
  selectMode = new Subject();
  newFilesComming = new Subject();
  loadFiles = new Subject();

  getFiles() {
    return this.restangular
      .one('file/list')
      .get({ path: this.currentPath.pathToString() });
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
  navigateTo(folder: PathClass) {
    this.currentPath = folder;
    console.log(',,' + folder.pathToString() + ',,');
    let paths = folder.pathToString().split('/');
    for (let i = 0; i < paths.length; i++) {
      console.log(paths[i]);
    }
    let route: string = '/';
    for (let i = 1; i < paths.length; i++) {
      route += paths[i];
      if (i != paths.length - 1) route += '^';
    }
    console.log(route);
    this.router.navigate([route]);
  }
}
