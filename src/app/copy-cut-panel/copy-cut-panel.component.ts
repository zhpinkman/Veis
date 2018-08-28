import { Component, OnInit } from '@angular/core';
import { FileService } from '@app/Services/file.service';
import { UtilitiesService } from '@app/Services/utilities.service';
import { ToolbarComponent } from '@app/toolbar/toolbar.component';
import { CopyRequest } from '@app/copyRequest';
import { FileEntity } from '@app/file';

@Component({
  selector: 'app-copy-cut-panel',
  templateUrl: './copy-cut-panel.component.html',
  styleUrls: ['./copy-cut-panel.component.scss']
})
export class CopyCutPanelComponent implements OnInit {
  oldPath: String;
  constructor(
    private fileService: FileService,
    private utils: UtilitiesService
  ) {
    this.creating_files();
  }

  ngOnInit() {}

  files = new Array<FileEntity>();
  creating_files() {
    let data = this.fileService.allFiles;
    let value = this.fileService.selectedFiles;
    value.forEach(val => {
      this.files.push(data[val]);
    });
    console.log(
      'files info: ',
      this.files,
      'files length: ',
      this.files.length
    );
    return this.files;
  }

  createOldPathesFromSelectedFiles() {
    let oldPathes = [];
    let data = this.fileService.allFiles;
    let value = this.fileService.selectedFiles;
    console.log('size of op: ', value.length);
    value.forEach(val => {
      this.oldPath = data[val].path;
      let index = this.oldPath.indexOf('/', 1);
      this.oldPath = this.oldPath.substring(index);
      oldPathes.push(this.oldPath);
    });
    console.log('oldPathes info= ', oldPathes);
    console.log('size of oldpathes: ', oldPathes.length);
    this.fileService.oldPathes = oldPathes;
  }

  submitPaste() {
    this.createOldPathesFromSelectedFiles();
    this.fileService.pasteMode = false;
    console.log(this.fileService.oldPathes);
    this.fileService.oldPathes.forEach(op => {
      console.log('After: ', this.oldPath, 'N: ', name);
      let request = new CopyRequest();
      request.oldPath = op;
      request.newPath = this.fileService.currentPath.pathToString();
      if (this.fileService.copyOrCut === 'copy') {
        this.fileService.copyFile(request).subscribe(
          data => {
            this.fileService.refreshPage.next();
            this.utils.success('موفقیت', 'کپی با موفقیت انجام شد');
          },
          error => {
            this.utils.error('خطا...', 'کپی با خطا مواجه شد!');
          }
        );
      } else {
        this.fileService.moveFile(request).subscribe(
          data => {
            this.fileService.refreshPage.next();
            this.utils.success('موفقیت', 'کات با موفقیت انجام شد');
          },
          error => {
            this.utils.error('خطا...', 'کات با خطا مواجه شد');
          }
        );
      }
    });

    this.fileService.selectedFiles = [];
    this.fileService.copyOrCut = null;
    this.fileService.OnselectMode.next(null);
  }
  submitCancel() {
    this.fileService.pasteMode = false;
    this.fileService.selectedFiles = [];
    this.fileService.copyOrCut = null;
    this.fileService.OnselectMode.next(null);
  }
}
