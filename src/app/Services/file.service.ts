import { TokenService } from '@app/Services/token.service';
import { mkDirRequest } from './../mkDirRequest';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RenameRequest } from '@app/renameRequest';
import { DeleteRequest } from '@app/DeleteRequest';
import { CopyRequest } from '@app/copyRequest';
import { MoveRequest } from '@app/moveRequest';
import { Injectable, Inject } from '@angular/core';
import { RESTANGULAR_AUTH } from '@app/restangular.config';
import { PathClass } from '@app/PathClass';
import { Subject, ReplaySubject } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ProgressHttp } from 'angular-progress-http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    @Inject(RESTANGULAR_AUTH) private restangular,
    private route: ActivatedRoute,
    private router: Router,
    private http: ProgressHttp,
    private token: TokenService
  ) {
    // console.log('zzz');
    this.handleRouteChange();
  }

  handleRouteChange() {
    this.router.events.subscribe((url: any) => {
      // console.log(url);
      if (url instanceof NavigationEnd) {
        // console.log(url);
        // console.log(url.url);
        let path = url.url.toString().split('/');

        // console.log('test');
        if (path.length >= 2 && path[1] === 'myfiles') {
          path.splice(1, 1);
          // console.log(path);

          // path.reduce();
          this.currentPath = new PathClass(path[0]);
          for (let i = 1; i < path.length; i++) {
            this.currentPath = new PathClass(path[i], this.currentPath);
          }
          // console.log(this.currentPath);
          // console.log(this.currentPath.name);
          // console.log(this.currentPath.pathToString());

          this.loadFiles.next();
        } else {
          return;
        }
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
  showMode = new ReplaySubject(1);
  selectMode = new Subject();
  newFilesComming = new Subject();
  loadFiles = new Subject();
  pasteMode: Boolean = false;
  selectedFiles = new ReplaySubject();
  allFiles = new ReplaySubject();

  getFiles() {
    // console.log(this.currentPath);
    return this.restangular
      .one('file/list')
      .get({ path: `${this.currentPath.pathToString()}` });
  }
  mkDir(folderName: string) {
    let mkDirRequest: mkDirRequest = {
      name: folderName,
      path: this.currentPath.pathToString()
    };
    if (mkDirRequest.path == '/') {
      mkDirRequest.path = '';
      // console.log('path was / ');
    }
    return this.restangular.one('file/mkDir').customPOST(mkDirRequest);
  }

  renameFile(renameRequest: RenameRequest) {
    return this.restangular.one('file/rename').customPOST(renameRequest);
  }
  deleteFile(deleteRequest: DeleteRequest) {
    return this.restangular.one('file/delete').customPOST(deleteRequest);
  }
  copyFile(copyRequest: CopyRequest) {
    return this.restangular.one('file/copyfile').customPOST(copyRequest);
  }
  moveRequest(moveRequest: MoveRequest) {
    return this.restangular.one('file/movefile').customPOST(moveRequest);
  }
  navigateTo(folder: PathClass) {
    // this.currentPath = folder;
    // console.log(folder, ',,', folder.toRoute(), ',,');
    // let paths = folder.toRoute().split('/');
    // console.log(folder.toRoute());

    // for (let i = 0; i < paths.length; i++) {
    // console.log(paths[i]);
    // }
    // let route: string = ;

    // console.log(route);
    this.router.navigate([folder.toRoute()]);
  }
  upload(files: FileList, fun: (progress: any, i: number) => any) {
    for (let i = 0; i < files.length; i++) {
      let form: FormData = new FormData();
      const options = new RequestOptions({
        headers: new Headers({
          Authorization: 'Bearer ' + this.token.accessToken
        })
      });
      form.append('file', files[i]);
      form.append('path', this.currentPath.pathToString());
      this.http
        .withUploadProgressListener(progress => {
          // console.log(progress);
          fun(progress, i);
        })
        .post('http://localhost:9500/file/upload', form, options)
        .subscribe(response => {
          // console.log(response);
        });
    }
  }
}
