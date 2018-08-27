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
import { ProgressHttp } from 'angular-progress-http';
import { RequestOptions, Headers } from '@angular/http';
import { environment } from 'environments/environment';

let host: string;
if (environment.production) host = 'http://142.93.66.250/api';
else host = 'http://localhost:9500';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  oldPathes: any[];
  copyOrCut: string = null;
  constructor(
    @Inject(RESTANGULAR_AUTH) private restangular,
    private route: ActivatedRoute,
    private router: Router,
    private http: ProgressHttp,
    private token: TokenService
  ) {
    this.handleRouteChange();
  }

  handleRouteChange() {
    this.router.events.subscribe((url: any) => {
      if (url instanceof NavigationEnd) {
        let path = url.url.toString().split('/');

        if (path.length >= 2 && path[1] === 'myfiles') {
          path.splice(1, 1);
          this.currentPath = new PathClass(path[0]);
          for (let i = 1; i < path.length; i++) {
            this.currentPath = new PathClass(path[i], this.currentPath);
          }

          this.currentPathRefreshed.next();
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
  selectedFile = new Subject();
  viewMode = new ReplaySubject(1);
  OnselectMode = new Subject();
  refreshPage = new Subject();
  currentPathRefreshed = new Subject();
  pasteMode: Boolean = false;
  whereClickIs = new Subject();
  selectedFiles = [];
  allFiles = [];

  getFiles() {
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
  moveFile(moveRequest: MoveRequest) {
    return this.restangular.one('file/movefile').customPOST(moveRequest);
  }
  navigateTo(folder: PathClass) {
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
          fun(progress, i);
        })
        .post(host + '/file/upload', form, options)
        .subscribe(response => {
          this.refreshPage.next();
        });
    }
  }
  initViewMode() {
    if (localStorage.getItem('viewMode'))
      return localStorage.getItem('viewMode');
  }
}
