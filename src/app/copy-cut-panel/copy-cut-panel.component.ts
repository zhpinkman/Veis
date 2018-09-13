import { Component, OnInit } from '@angular/core';
import { FileService } from '@app/Services/file.service';
import { UtilitiesService } from '@app/Services/utilities.service';
import { ToolbarComponent } from '@app/toolbar/toolbar.component';
import { CopyRequest } from '@app/copyRequest';
import { FileEntity } from '@app/file';
import { ConstService } from '@app/Services/const.service';

@Component({
  selector: 'app-copy-cut-panel',
  templateUrl: './copy-cut-panel.component.html',
  styleUrls: ['./copy-cut-panel.component.scss']
})
export class CopyCutPanelComponent implements OnInit {
  oldPath: String;
  constructor(
    public fileService: FileService,
    private utils: UtilitiesService,
    public consts: ConstService
  ) {}

  ngOnInit() {}

  submitPaste() {
    this.fileService.pasteMode = false;
    // console.log(this.fileService.oldPathes);
    this.fileService.copiedFiles.forEach(cf => {
      // console.log('After: ', this.oldPath, 'N: ', name);
      let request = new CopyRequest();
      this.oldPath = cf.path;
      let index = this.oldPath.indexOf('/', 1);
      this.oldPath = this.oldPath.substring(index);
      request.oldPath = this.oldPath;
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
    this.fileService.copiedFiles = [];
  }

  submitCancel() {
    this.fileService.pasteMode = false;
    this.fileService.selectedFiles = [];
    this.fileService.copyOrCut = null;
    this.fileService.OnselectMode.next(null);
    this.fileService.copiedFiles = [];
  }

  remove(i) {
    this.fileService.copiedFiles.splice(i, 1);
  }
}
